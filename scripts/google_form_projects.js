/* Send Form by Email */

function Initialize() {

  var triggers = ScriptApp.getProjectTriggers();

  for(var i in triggers) {
    ScriptApp.deleteTrigger(triggers[i]);
  }

  ScriptApp.newTrigger("SendGoogleForm")
  .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
  .onFormSubmit()
  .create();

}

function getCoachCount(data, keys) {
  var counts = {};
  for (var i=0; i < keys.length; i++) {
    if(keys[i] == "Coach"){
      for(var j=0; j < data.length; j++) {
        var cellData = data[j][i];
        if(isCellEmpty_(cellData)){
          continue;
        }
        if(counts[cellData]){
          counts[cellData]++;
        } else {
          counts[cellData] = 1;
        }
      }
    }
  }
  return counts;
}


// Returns true if the cell where cellData was read from is empty.
// Arguments:
//   - cellData: string
function isCellEmpty_(cellData) {
  return typeof(cellData) == "string" && cellData == "";
}


function selectCoach(tracks, coachCounts){

  var allCoaches = {
    "Openness": [
      {"github": "@quirksahern & @fimakeswork", "email":"abby@mozillafoundation.org", "name":"Sam & Fi"},
      {"github": "@tpoisot", "email":"abby@mozillafoundation.org", "name":"Tim"},
      {"github": "@gilbertslade", "email":"abby@mozillafoundation.org", "name":"Gilbert"},
      {"github": "@SamanthaHindle & @aariops", "email":"abby@mozillafoundation.org", "name":"Rute"},
      {"github": "@chadsansing", "email":"abby@mozillafoundation.org", "name":"Chad"}
      ],
    "Web Literacy": [
      {"github": "@anmechung", "email":"abby@mozillafoundation.org", "name":"An-Me"},
      {"github": "@jamjwait", "email":"abby@mozillafoundation.org", "name":"Janice"},
      {"github": "@Wiroll & @psubhashish", "email":"abby@mozillafoundation.org", "name":"Craig & Subha"}
    ],
    "Internet Privacy": [
      {"github": "@veerskyfire", "email":"abby@mozillafoundation.org", "name":"Viral"},
      {"github": "@princiya", "email":"abby@mozillafoundation.org", "name":"Princiya"},
    ],
    "Digital Inclusion": [
      {"github": "@cbaba20", "email":"abby@mozillafoundation.org", "name":"Chandan"},
      {"github": "@meghanlazier", "email":"abby@mozillafoundation.org", "name":"Meghan"},
      {"github": "@erindcole", "email":"abby@mozillafoundation.org", "name":"Erin"},
      {"github": "---", "email":"abby@mozillafoundation.org", "name":"Leah"},
    ],
    "Decentralization": [
      {"github": "@aj-ptw", "email":"abby@mozillafoundation.org", "name":"AJ"}
    ]
  };

  var coaches = [];
  for(var i = 0; i<tracks.length; i++){
    var c = allCoaches[tracks[i]];
    if(c){
      coaches = coaches.concat(c);
    }
  }

  var coach;
  var lowestCount;
  for(var j = 0; j<coaches.length; j++) {
    var curr = coachCounts[coaches[j]["name"]];
    if(!curr) { curr = 0 };
    if(!coach || curr < lowestCount){
      lowestCount = curr;
      coach = coaches[j];
      Logger.log("current lowest: " + lowestCount);
      Logger.log("current coach: " + coach["name"]);
    }
  }
  Logger.log(coach);
  return coach;
}

function SendGoogleForm(e)
{
  var getTrack = {
  "WEB LITERACY: Projects that teach individuals skills to shape — and not simply consume — the web": "Web Literacy",
  "OPENNESS: Projects that enshrine the technologies that run the web as transparent and understandable, and allow anyone to invent online without asking permission": "Openness",
  "PRIVACY & SECURITY: Projects that illuminate what happens to our personal data online, and how to make the Internet safer for all": "Internet Privacy",
  "DIGITAL INCLUSION: Projects that ensure everyone has an equal opportunity to access the Internet, and can use it to improve their lives and societies": "Digital Inclusion",
  "DECENTRALIZATION: Projects that protect and secure an Internet controlled by many, so that no one actor can own it or control it or switch it off": "Decentralization"
  };

  var template_start = "%3C%21---%20Keep%20everything%20below%20and%20click%20%27Submit%20new%20issue%27%20%20---%3E%0D%0A%0D%0A%2A%2A%5B%20Project%20Contact%20%5D%2A%2A%20";
  var template_contribute = "%2A%2A%2A%0D%0A%0D%0A%23%23%20Want%20to%20contribute%20to%20this%20project%20during%20%23mozsprint%3F%0D%0AJoin%20us%20at%20the%20Global%20Sprint%2C%20May%2010-11.%20Leave%20a%20comment%20below%20if%20you%27re%20interested%20in%20contributing%20to%20this%20project%20during%20%23mozsprint%202018%21%0D%0A%0D%0A%2A%2A%2A%0D%0A%0D%0A%23%23%20Note%20to%20the%20Project%20Lead%20%3Atada%3A%0D%0ACongrats%2C%20";
  var template_pl_a = "%21+This+is+your+official+project+listing+for+the+Mozilla+Global+Sprint+2018.+To+confirm+your+registration%2C+please+complete+and+check+off+the+following%3A%0D%0A%0D%0A-+%5B";
  var template_pl_b = "%5D+Complete+%5BOpen+Leadership+101%5D%28https%3A%2F%2Fmozilla.teachable.com%2Fp%2Fopen-leadership-101%29%0D%0A-+%5B";
  var template_pl_c = "%5D+Provide+a+GitHub+repository+for+work+and+discussion+on+your+project+%28in+a+comment+or+at+the+top+of+this+issue%29%0D%0A";
  var template_pl_d = "++-+new+to+GitHub%3F++Here%27s+a+%5Bstep-by-step+guide+on+using+the+%23mozsprint+template%5D%28https%3A%2F%2Fmozilla.github.io%2Fglobal-sprint%2Fproject-lead-guide%2Ftemplates%2F%29%0D%0A";
  var template_pl_e = "-+%5B+%5D+%5BCreate+a+README+file%5D%28https%3A%2F%2Fmozilla.github.io%2Fopen-leadership-training-series%2Farticles%2Fopening-your-project%2Fwrite-a-great-project-readme%2F%29+in+your+project+repository.+This+file+should+help+newcomers+understand+what+your+project+is%2C+why+it%27s+important%2C+and+kinds+of+help+you%27re+looking+for.%0D%0A-+%5B+%5D+%5BCreate+file%3A+LICENSE%5D%28http%3A%2F%2Fchoosealicense.com%2F%29+to+give+your+project+an+open+license%2C+allowing+for+sharing+and+remixing.%0D%0A-+%5B+%5D+Turn+on+your+%5BIssue+Tracker%5D%28https%3A%2F%2Fmozilla.github.io%2Fglobal-sprint%2Fproject-lead-guide%2Ftemplates%2F%234-create-issues%29+and+create+at+least+three+issues+to+describe+each+task+that+you+need+help+with+and+how+a+contributor+can+get+started+on+that+task.%0D%0A-+%5B+%5D+%5BCreate+a+label%5D%28https%3A%2F%2Fmozilla.github.io%2Fglobal-sprint%2Fproject-lead-guide%2Ftemplates%2F%235-add-a-mozsprint-label%29+called+%60mozsprint%60+and+apply+it+to+your+issues.%0D%0A%0D%0A%23%23%23%23+Checklist+for+FEATURED+Projects+%3Aclipboard%3A%0D%0ATo+have+your+project+FEATURED+on+%5BMozilla+Pulse%5D%28http%3A%2F%2Fmozillapulse.org%2F%29%2C+complete+the+following+documentation.+In+past+Sprints%2C+well-documented+featured+projects+have+5+times+more+contributions+than+other+projects.+Details+about+each+item+and+more+information+about+how+to+create+them+are+%5Bon+our+Project+Requirements+Page%5D%28https%3A%2F%2Fmozilla.github.io%2Fglobal-sprint%2Fproject-lead-guide%2Fproject-requirements%2F%29.%0D%0A%0D%0A%2A+%5B+%5D+In+your+README%2C+link+to+the+%5BMozilla+Community+Participation+Guidelines%5D%28https%3A%2F%2Fwww.mozilla.org%2Fen-US%2Fabout%2Fgovernance%2Fpolicies%2Fparticipation%2F%29+or+%5Bwrite+your+own+code+of+conduct%5D%28https%3A%2F%2Fmozilla.github.io%2Fopen-leadership-training-series%2Farticles%2Fbuilding-communities-of-contributors%2Fwrite-a-code-of-conduct%2F%29.%0D%0A%2A+%5B+%5D+Create+file%3A+CONTRIBUTING.md+so+others+know+how+they+can+contribute.+If+you%27d+like%2C+you+can+%5Bremix+this+template%5D%28https%3A%2F%2Fgithub.com%2Facabunoc%2Fmozsprint-repo-template%2Fblob%2Fmaster%2FCONTRIBUTING.md%29%0D%0A%2A+%5B+%5D+%5BFollow+these+instructions%5D%28https%3A%2F%2Fmozilla.github.io%2Fglobal-sprint%2Fproject-lead-guide%2Ffeatured-projects%2F%29+to+submit+your+project+to+Mozilla+Pulse.%0D%0A%0D%0AOnce+all+of+the+above+is+complete%2C%0D%0A-+%5B+%5D+Leave+a+comment+with+the+text+%60This+is+ready+to+be+featured+on+Mozilla+Pulse%60.+";
  var template_pl_f = "+will+review+this+issue+and+approve+your+project+if+everything+looks+good+%3Aballoon%3A%0D%0A%0D%0AIf+you+get+stuck+at+any+point%2C+feel+free+to+look+at+the+%5Brequirements+page%5D%28https%3A%2F%2Fmozilla.github.io%2Fglobal-sprint%2Fproject-lead-guide%2Fproject-requirements%2F%29+and+%5Bproject+templates%5D%28https%3A%2F%2Fmozilla.github.io%2Fglobal-sprint%2Fproject-lead-guide%2Ftemplates%2F%29";
  var template_pl_g = ".+We%27re+here+to+help+you+through+this+process.";

  try
  {
    // You may also replace this with another email address
    var email = "abby@mozillafoundation.org"; //Session.getActiveUser().getEmail();

    var s = SpreadsheetApp.getActiveSheet();
    var headers = s.getRange(1,1,1,s.getLastColumn()).getValues()[0];
    var dataRange = s.getRange(s.getFrozenRows()+1, 1, s.getMaxRows(), s.getMaxColumns());


    var reply = e.namedValues['Email'].toString();
    var project = e.namedValues['Project Title'].toString();
    var name =  e.namedValues['Name'].toString();
    var row = e.range.getRow();

    var github = e.namedValues['GitHub ID'].toString();
    github = formatGitHubId(github) || name;
    var link = e.namedValues['Project Link'];
    if(link) { link = link.toString(); }
    var track = e.namedValues['Select one or more tracks for your project'];
    if(track) { track = track.toString(); }
    var tracks = track.split('.');
    tracks = tracks.map(function(t){
      if(t){
        if(t.slice(0,2)==', '){
          t = t.slice(2);
        }
        var tr = getTrack[t];
        return tr || t;
      }
    })
    track = tracks.join(', ');
    var mentored = e.namedValues['Mozilla Open Leaders'];
    if(mentored) { mentored = mentored.toString(); }
    var coach;
    if (mentored != "Yes") {
      coach = selectCoach(tracks, getCoachCount(dataRange.getValues(), headers));
      Logger.log(coach);
      var coachCell = s.getRange("Q" + row);
      coachCell.setValue(coach["name"]);
    }
    var ol101 = e.namedValues['Have you taken the short (1-hour) online course Open Leadership 101?'];
    if(ol101) { ol101 = ol101.toString(); }

    var location = e.namedValues['What is your physical location and time zone?'];
    if(location) { location = location.toString(); }
    var description =  e.namedValues['Project Description'].toString();
    var body = template_start
      + encodeURIComponent(github)
      + encodeURIComponent("\n**[ GitHub Repo ]** " + link)
      + encodeURIComponent("\n**[ Track ]** " + track)
      + encodeURIComponent("\n**[ Location ]** " + location)
      + encodeURIComponent("\n\n### Description\n" + description + "\n")
      + template_contribute
      + encodeURIComponent(github)
      + template_pl_a;
    body += (ol101 == "Yes! I have taken Open Leadership 101") ? "x" : "+";
    body += template_pl_b;
    body += link ? "x" : "+";
    body += template_pl_c;
    body += link ? template_pl_d : "";
    body += template_pl_e;
    body += coach ? encodeURIComponent("Your Project Coach ") :  encodeURIComponent("@acabunoc or @zee-moz ") ;
    body += template_pl_f;
    body += coach ? encodeURIComponent(" or reach out to your Project Coach, " + coach["github"]) : "";
    body += template_pl_g;

    var link_base = "https://github.com/mozilla/global-sprint/issues/new?title=" + encodeURIComponent(project);
    var link = link_base + "&body=" + body;
    link = link.replace(/\'/g, '%27');


    var subject = "#mozsprint project - " + project;
    var message = "Dear " + name + ",";

    message += "<p>Thank you for submitting your open project, " + project + ", to Mozilla's Global Sprint 2018 (#mozsprint). ";
    message += "To complete your registration, you'll need to</p><p>1) Log in to <a href=\"https://github.com/\">GitHub</a>. You can register for free if you don't have an account.</p><p>2) Follow <a href='" + link + "'>this unique link</a> and click on 'Create new issue' to generate a listing for your project:</p>";
    message +="<p><br /><a href='" + link + "' style='font-size:14pt;background:#3bb7ef;padding:10px 15px;color:black;text-decoration:none;margin:10px 0;'>Create Project Listing</a><br /><br /></p>"
    message += "<p>If you run into trouble, check out our <a href='https://mozilla.github.io/global-sprint/project-lead-guide/'>Guide for Project Leads</a>."
    if(coach) {
      message += " " +  coach["name"] + " (cc’ed) will be your Project Coach during the Sprint. Your Project Coach will help you prepare your project and answer any questions you may have."
    }
    message += "</p><p>If you have any questions that aren't answered there, feel free to reach out -- email us at <a href='mailto:globalsprint@mozillafoundation.org'>globalsprint@mozillafoundation.org</a>";
    if(coach){
      message += " or reach out to your Project Coach";
    }
    message += ". We're here to help! </p>";
    message += "<p>See you at #mozsprint!<br />Abby";
    if(coach){
      message += ", " + coach["name"];
    }
    message += " and the Global Sprint team</p><br /><hr><br />";
    message += "<p style='font-size:small;color:#666'>Link above didn't work? Make you're logged into GitHub before logging in. Full url here: " + link + "<br /><br />";
    message += "Still have problems? Reply to this email and we'll help you out!</p>"


    // This is the MailApp service of Google Apps Script
    // that sends the email. You can also use GmailApp here.

    var mailConfig = {
     to: reply,
     subject: subject,
     htmlBody: message
    };
    if(coach){
      mailConfig["cc"] = coach["email"];
    }

    MailApp.sendEmail(mailConfig);

  } catch (e) {
    Logger.log(e.toString());
          MailApp.sendEmail('globalsprint@mozillafoundation.org',
                    'error in mozsprint 2018 project email script. Check the spreadsheet!',
                    e);
  }

}


function formatGitHubId(id) {
  if(!id){ return; }
  var ids = id.split("/");
  while(!(id = ids.pop())){}
  ids = id.split("@");
  while(!(id = ids.pop())){}
  return "@" + id;
}

