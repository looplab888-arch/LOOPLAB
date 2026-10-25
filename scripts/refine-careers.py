from pathlib import Path
p=Path('src/pages/CareersHub.jsx')
s=p.read_text(encoding='utf-8-sig')
s=s.replace('href="#open-roles" className="button primary">Explore opportunities','href={DEFAULT_MAILTO_HREF} className="button primary">Email your CV')
s=s.replace('Current openings could not be loaded. You can retry or send your CV by email.','Our recruitment portal is being updated. We are accepting CVs and resumes directly by email while the openings feed is unavailable.')
s=s.replace('<div className="careers-filters">','{!error && <div className="careers-filters">').replace('</select></label></div>','</select></label></div>}')
s=s.replace('Let’s keep the door open.','Email applications are open.')
s=s.replace('<button className="button dark" onClick={()=>{setLoading(true);setError(null);setRetry(x=>x+1);}}>Try again <Arrow /></button>','<a href={DEFAULT_MAILTO_HREF} className="button primary">Send your CV by email <Arrow /></a><button className="text-link feed-retry" onClick={()=>{setLoading(true);setError(null);setRetry(x=>x+1);}}>Check the openings feed again</button>')
start=s.index('  <section className="careers-email wrap">'); end=s.index('</section>',start)+10
email=s[start:end]; s=s[:start]+s[end:]
email=email.replace('<h2>More than a CV.</h2>','<h2>We’re accepting<br />applications by email.</h2>').replace('Tell us what you enjoy building. Share your CV, the role you’re interested in, and a portfolio or project link if you have one.','The recruitment portal is being updated. Send your CV directly to our team and tell us which role you are interested in.').replace('Introduce yourself <Arrow />','Email your CV directly <Arrow />')
guide='<dl className="application-guide"><div><dt>Email subject</dt><dd>Application: [Role Name] - [Your Full Name]</dd></div><div><dt>What to include</dt><dd>Attach your CV or resume as a PDF. Include links to your portfolio, GitHub, or LinkedIn, and a way to contact you.</dd></div></dl>'
email=email.replace('<div><a className="button primary"',guide+'<div><a className="button primary"')
s=s.replace('  <section className="careers-openings wrap"',email+'\n  <section className="careers-openings wrap"')
p.write_text(s,encoding='utf-8')
