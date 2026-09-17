export async function onRequestPost(context) {
  const { request, env } = context;
  let body;
  try { body = await request.json(); } catch { return json({error:'Invalid request.'},400); }
  if (body.website) return json({ok:true});
  const required=['name','organisation','email','service','message'];
  for (const field of required) if (!String(body[field]||'').trim()) return json({error:`Missing ${field}.`},400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return json({error:'Enter a valid email address.'},400);

  // Delivery is intentionally disabled until a mail provider/API key is configured.
  // Supported path: set RESEND_API_KEY and CONTACT_FROM in Cloudflare Pages environment variables.
  if (!env.RESEND_API_KEY || !env.CONTACT_FROM) return json({error:'Contact delivery is not configured yet.'},503);

  const subject=`Finbus website enquiry — ${body.service}`;
  const text=`Name: ${body.name}\nOrganisation: ${body.organisation}\nEmail: ${body.email}\nPhone: ${body.phone||'Not provided'}\nService: ${body.service}\n\n${body.message}`;
  const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:env.CONTACT_FROM,to:['info@finbus.org'],reply_to:body.email,subject,text})});
  if(!r.ok) return json({error:'Message delivery failed.'},502);
  return json({ok:true});
}
function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}})}
