(function(root) {
  'use strict';
  const base='https://scholarships.gov.in/public/schemeGuidelines/';
  const commonDocs=['Current income certificate','Qualifying examination marksheets','Admission / bonafide certificate','OTR and identity documents required by NSP','Bank account details required by NSP'];
  const schemes=[
    {id:'pragati',name:'AICTE Pragati',authority:'All India Council for Technical Education',type:'Merit',tag:'Women in technical education',icon:'✦',color:'purple',amount:50000,award:'₹50,000 / year',levels:['ugtech','diploma'],description:'Support for girls beginning an approved technical degree or diploma.',sources:[['Degree guidelines',base+'AICTE/AICTE_2010_G.pdf'],['Diploma guidelines',base+'AICTE/AICTE_2011_G.pdf']],docs:[...commonDocs,'Family declaration for maximum two girl beneficiaries'],scope:'Fresh entry: year 1, or year 2 through lateral entry. Renewal applicants should use NSP renewal guidance.',conditions:'Female student; family income up to ₹8 lakh; AICTE-approved course and institution; at most two girl beneficiaries in the family; qualifying-exam gap at most two years.'},
    {id:'saksham',name:'AICTE Saksham',authority:'All India Council for Technical Education',type:'Welfare',tag:'Students with disabilities',icon:'◈',color:'blue',amount:50000,award:'₹50,000 / year',levels:['ugtech','diploma'],description:'Support for students with a certified disability in technical education.',sources:[['Degree guidelines',base+'AICTE/AICTE_2012_G.pdf'],['Diploma guidelines',base+'AICTE/AICTE_2013_G.pdf']],docs:[...commonDocs,'Disability certificate / UDID as required'],scope:'Fresh entry: year 1, or year 2 through lateral entry. Verify UDID consent and renewal rules on NSP.',conditions:'Certified disability of at least 40%; income up to ₹8 lakh; AICTE-approved course and institution; qualifying-exam gap at most two years.'},
    {id:'swanath',name:'AICTE Swanath',authority:'All India Council for Technical Education',type:'Welfare',tag:'Support through difficult circumstances',icon:'♡',color:'rose',amount:50000,award:'₹50,000 / year',levels:['ugtech','diploma'],description:'Technical education support for students in specified vulnerable family circumstances.',sources:[['May 2025 guidelines',base+'AICTE/AICTE_3039_G.pdf']],docs:[...commonDocs,'Relevant death, martyr, medical or accident evidence'],scope:'Degree years 1–4 or diploma years 1–3, in regular mode. Evidence must establish the specified family circumstance.',conditions:'Income up to ₹8 lakh; approved technical study; orphan, parental death due to COVID-19, ward of personnel martyred in action, or the parental critical illness / accident circumstances specified in the May 2025 rules.'},
    {id:'csss',name:'PM-USP CSSS',authority:'Ministry of Education',type:'Merit',tag:'Merit meets opportunity',icon:'⌁',color:'green',amount:12000,award:'₹12,000–₹20,000 / year',levels:['ugtech','ugother'],description:'Merit and income based support for regular college degree students.',sources:[['2025–26 official FAQ','https://www.education.gov.in/sites/upload_files/mhrd/files/upload_document/FAQs_PM_USP_CSSS_scheme_AY_2025_26.pdf']],docs:[...commonDocs,'Board evidence of above-80th percentile standing'],scope:'This checker models fresh-entry academic rules. NSP currently lists renewal applications only; existing awardees must follow renewal rules.',conditions:'Above the 80th percentile in the relevant Class XII board stream, regular recognized degree study, income up to ₹4.5 lakh and no drop after Class XII. Diploma study is excluded. First three years: ₹12,000/year; later eligible years: ₹20,000/year.'},
    {id:'nmms',name:'National Means-cum-Merit',authority:'Ministry of Education',type:'Merit',tag:'A stronger start at school',icon:'▱',color:'orange',amount:12000,award:'₹12,000 / year',levels:['school8','school9'],description:'An examination-based route to support from Class IX onwards.',sources:[['Revised NMMSS guidelines',base+'NMMSSGuidelines.pdf']],docs:[...commonDocs,'State selection / MAT–SAT result','School eligibility confirmation','Category certificate for SC/ST relaxation, if applicable'],scope:'Class VIII: selection-test readiness. Class IX: fresh award screening after state selection. Classes X–XII renewal rules are outside this checker.',conditions:'Income up to ₹3.5 lakh; eligible government, aided or local-body school. Class VII and VIII threshold: 55%, or 50% for SC/ST. State MAT/SAT selection is required before an award; private, KV, JNV and specified residential schools are excluded.'},
    {id:'pg',name:'National Scholarship for PG Studies',authority:'University Grants Commission',type:'Merit',tag:'Your next chapter',icon:'↗',color:'purple',amount:150000,award:'₹1,50,000 / year',levels:['pg'],description:'Merit-selected support for a first, full-time postgraduate degree.',sources:[['Official PG guidelines',base+'Guidelines_NATIONAL_SCHOLARSHIP_FOR_POSTGRADUATE_STUDIES_UGC_2324.pdf']],docs:['UG degree / marksheets','First PG admission certificate','Institution eligibility / AISHE confirmation','Identity and bank information required by NSP','Category evidence, if applicable'],scope:'First PG degree, first year, in India. Eligible UGC / accredited or qualifying government institutions; confirm AISHE registration.',conditions:'Indian student below age 30 at admission to the first PG programme; first-year regular full-time study at an eligible institution. ₹15,000/month for ten months, up to two years; selection depends on merit and available slots.'}
  ].map(s=>({...s,checked:'2026-10-14',deadline:'2026-10-31',deadlineScope:s.id==='csss'?'Renewal only':s.id==='nmms'?'NSP award application; state exam dates differ':'NSP student application'}));
  const labels={match:'Preliminary match',review:'Needs review',no:'Does not match'};
  const missing=v=>v===undefined||v===null||v===''||v==='unknown';
  const numeric=v=>!missing(v)&&Number.isFinite(Number(v));
  function evaluate(s,p) {
    const checks=[];
    const check=(label,val,test,pass,fail)=>checks.push({label,status:missing(val)?'review':test(val)?'pass':'fail',message:missing(val)?'Not known yet. Confirm this condition.':test(val)?pass:fail});
    const number=(label,val,test,pass,fail)=>check(label,numeric(val)?Number(val):'unknown',test,pass,fail);
    check('Indian student',p.citizen,v=>v==='yes','Indian student confirmed.','This catalogue covers Indian students.');
    check('Study level',p.level,v=>s.levels.includes(v),'Your study level is covered.','Your study level is outside this fresh-entry route.');
    check('Regular study',p.mode,v=>v==='regular','Regular / full-time study confirmed.','Distance, correspondence or part-time study is excluded.');
    if(['pragati','saksham','swanath'].includes(s.id)) {
      check('AICTE approval',p.aicte,v=>v==='yes','Course AND institution approval confirmed.','Both course and institution must be AICTE approved.');
      number('Annual family income',p.income,v=>v>=0&&v<=800000,'Within the ₹8 lakh limit.','Income exceeds ₹8 lakh or is invalid.');
      if(s.id==='swanath') {
        number('Year of study',p.year,v=>v>=1&&v<=(p.level==='diploma'?3:4),'Covered year of study.','Only degree years 1–4 or diploma years 1–3 are covered.');
        check('Family circumstance',p.hardship,v=>['orphan','covid','martyr','illness','accident'].includes(v),'A specified circumstance is reported; documentary verification is required.','None of the specified circumstances applies.');
      } else {
        check('Fresh-entry year',missing(p.year)?'unknown':`${p.year}|${p.lateral}`,v=>p.year==='1'||Number(p.year)===1||(Number(p.year)===2&&p.lateral==='yes'),'First year or lateral-entry second year.','This fresh-entry route requires year 1 or lateral-entry year 2.');
        if(Number(p.year)===2&&missing(p.lateral)) { checks[checks.length-1]={label:'Fresh-entry year',status:'review',message:'Confirm whether second-year admission was through lateral entry.'}; }
        number('Gap before admission',p.gap,v=>v>=0&&v<=2,'Gap is within two years.','The qualifying-exam gap exceeds two years.');
      }
      if(s.id==='pragati') {
        check('Gender',p.gender,v=>v==='female','Girl student criterion met.','This scheme is for girl students.');
        number('Other girl beneficiaries',p.girlBeneficiaries,v=>v>=0&&v<2,'Fewer than two other girls in your family receive Pragati.','Maximum two girl beneficiaries per family, including you.');
      }
      if(s.id==='saksham') number('Certified disability',p.disability,v=>v>=40&&v<=100,'Disability is at least 40%.','Certified disability must be at least 40%.');
    }
    if(s.id==='csss') {
      number('Annual family income',p.income,v=>v>=0&&v<=450000,'Within the ₹4.5 lakh limit.','Income exceeds ₹4.5 lakh or is invalid.');
      check('Board percentile',p.top20,v=>v==='yes','Above 80th percentile in the relevant Class XII board stream.','The required board percentile condition is not met. Percentage marks alone do not establish percentile.');
      number('Drop after Class XII',p.gap,v=>v===0,'No drop after Class XII.','Fresh CSSS excludes students who took a drop after Class XII.');
      number('Fresh-entry year',p.year,v=>v===1,'First year of undergraduate degree.','This checker only screens fresh-entry CSSS rules; existing awardees should check renewal rules.');
      check('Recognized institution',p.recognized,v=>v==='yes','Recognized degree study confirmed.','Recognized degree study is required.');
      checks.push({label:'Application availability',status:'review',message:'NSP currently lists CSSS renewal only. Fresh application availability must be confirmed.'});
    }
    if(s.id==='nmms') {
      number('Annual family income',p.income,v=>v>=0&&v<=350000,'Within the ₹3.5 lakh limit.','Income exceeds ₹3.5 lakh or is invalid.');
      check('School type',p.schoolType,v=>['government','aided','local'].includes(v),'Eligible school type reported. Confirm it is not an excluded residential school.','Private, KV, JNV and specified residential schools are excluded.');
      const threshold=missing(p.category)?null:['sc','st'].includes(p.category)?50:55;
      if(threshold===null) checks.push({label:'Class VII marks',status:'review',message:'Confirm category to determine the 50% or 55% threshold.'});
      else number('Class VII marks',p.marks7,v=>v>=threshold&&v<=100,`At least ${threshold}% in Class VII.`,`Class VII marks must be at least ${threshold}%.`);
      if(p.level==='school9') {
        if(threshold===null) checks.push({label:'Class VIII marks',status:'review',message:'Confirm category to determine the marks threshold.'});
        else number('Class VIII marks',p.marks8,v=>v>=threshold&&v<=100,`At least ${threshold}% in Class VIII.`,`Class VIII marks must be at least ${threshold}%.`);
        check('State selection',p.nmmsSelected,v=>v==='yes','State NMMSS selection confirmed.','You must be selected through the state MAT/SAT examination, not only pass school exams.');
      } else checks.push({label:'State selection examination',status:'review',message:'Class VIII screening is exam readiness only. Complete the state selection route before an award in Class IX.'});
    }
    if(s.id==='pg') {
      number('Age at PG admission',p.age,v=>v>=0&&v<30,'Below 30 at admission.','The detailed PG guidelines require age below 30 at admission.');
      number('Year of study',p.year,v=>v===1,'First year of PG study.','Fresh entry requires the first PG year.');
      check('First PG degree',p.firstPg,v=>v==='yes','No previous PG degree.','Only the first PG degree is eligible.');
      check('Eligible institution',p.pgInstitution,v=>v==='yes','Eligible institution and course reported; confirm AISHE registration.','Institution must meet the PG scheme’s UGC / accreditation or qualifying government-institution rules.');
    }
    if(s.id!=='nmms') {
      if(p.otherAid!=='no') checks.push({label:'Other financial assistance',status:'review',message:'NSP announces merit + welfare applications from AY 2026–27, subject to scheme criteria. Older guidelines restrict concurrent benefits. Confirm your exact combination with NSP / the institution.'});
      else checks.push({label:'Other financial assistance',status:'pass',message:'No other scholarship, stipend, salary or fee reimbursement reported.'});
    }
    const status=checks.some(c=>c.status==='fail')?'no':checks.some(c=>c.status==='review')?'review':'match';
    return {id:s.id,status,label:labels[status],checks};
  }
  function deadlineState(s,date=new Date()) {
    const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(date);
    return today>s.deadline?'Listed deadline passed':'Listed deadline: 31 Oct 2026';
  }
  const api={schemes,labels,evaluate,deadlineState};
  if(typeof module!=='undefined')module.exports=api;
  root.ScholarshipEngine=api;
})(typeof globalThis!=='undefined'?globalThis:this);
