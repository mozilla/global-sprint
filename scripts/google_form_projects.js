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


function SendGoogleForm(e)
{
  var getTrack = {
  "WEB LITERACY: Projects that teach individuals skills to shape — and not simply consume — the web": "Web Literacy",
  "OPENNESS: Projects that enshrine the technologies that run the web as transparent and understandable, and allow anyone to invent online without asking permission": "Openness",
  "PRIVACY & SECURITY: Projects that illuminate what happens to our personal data online, and how to make the Internet safer for all": "Privacy + Security",
  "DIGITAL INCLUSION: Projects that ensure everyone has an equal opportunity to access the Internet, and can use it to improve their lives and societies": "Digital Inclusion",
  "DECENTRALIZATION: Projects that protect and secure an Internet controlled by many, so that no one actor can own it or control it or switch it off": "Decentralization"
  };
  var template_start = "%3C%21---%20Keep%20everything%20below%20and%20click%20%27Submit%20new%20issue%27%20%20---%3E%0D%0A%0D%0A%2A%2A%5B%20Project%20Contact%20%5D%2A%2A%20";
  var template_contribute = "%2A%2A%2A%0D%0A%0D%0A%23%23%20Want%20to%20contribute%20to%20this%20project%20during%20%23mozsprint%3F%0D%0AJoin%20us%20at%20the%20Global%20Sprint%2C%20May%2010-11.%20Leave%20a%20comment%20below%20if%20you%27re%20interested%20in%20contributing%20to%20this%20project%20during%20%23mozsprint%202018%21%0D%0A%0D%0A%2A%2A%2A%0D%0A%0D%0A%23%23%20Note%20to%20the%20Project%20Lead%20%3Atada%3A%0D%0ACongrats%2C%20";
  var template_notes_to_project_lead = "%21%20This%20is%20your%20official%20project%20listing%20for%20the%20Mozilla%20Global%20Sprint%202018.%20To%20confirm%20your%20registration%2C%20please%20complete%20and%20check%20off%20the%20following%3A%0D%0A%0D%0A-%20%5B%20%5D%20Complete%20%5BOpen%20Leadership%20101%5D%28https%3A%2F%2Fmozilla.teachable.com%2Fp%2Fopen-leadership-101%29%0D%0A-%20%5B%20%5D%20Provide%20a%20GitHub%20repository%20for%20work%20and%20discussion%20on%20your%20project%20in%20a%20comment%0D%0A%20%20-%20new%20to%20GitHub%3F%20%20Here%27s%20a%20%5Bstep-by-step%20guide%20on%20using%20the%20%23mozsprint%20template%5D%28https%3A%2F%2Fmozilla.github.io%2Fglobal-sprint%2Fproject-lead%2Ftemplates%2F%29%0D%0A-%20%5B%20%5D%20Create%20a%20README%20file%20in%20your%20project%20repository.%20This%20file%20should%20help%20newcomers%20understand%20what%20your%20project%20is%2C%20why%20it%27s%20important%2C%20and%20kinds%20of%20help%20you%27re%20looking%20for.%0D%0A-%20%5B%20%5D%20%5BCreate%20file%3A%20LICENSE%5D%28http%3A%2F%2Fchoosealicense.com%2F%29%20to%20give%20your%20project%20an%20open%20license%2C%20allowing%20for%20sharing%20and%20remixing.%0D%0A-%20%5B%20%5D%20Turn%20on%20your%20%5BIssue%20Tracker%5D%28https%3A%2F%2Fmozilla.github.io%2Fglobal-sprint%2Fproject-lead%2Ftemplates%2F%234-create-issues%29%20and%20create%20at%20least%20three%20issues%20to%20describe%20each%20task%20that%20you%20need%20help%20with%20and%20how%20a%20contributor%20can%20get%20started%20on%20that%20task.%0D%0A-%20%5B%20%5D%20%5BCreate%20a%20label%5D%28https%3A%2F%2Fmozilla.github.io%2Fglobal-sprint%2Fproject-lead%2Ftemplates%2F%235-add-a-mozsprint-label%29%20called%20%60mozsprint%60%20and%20apply%20it%20to%20your%20issues.%0D%0A%0D%0A%23%23%23%23%20Checklist%20for%20FEATURED%20Projects%20%3Aclipboard%3A%0D%0ATo%20have%20your%20project%20FEATURED%20on%20%5BMozilla%20Pulse%5D%28http%3A%2F%2Fmozillapulse.org%2F%29%2C%20complete%20the%20following%20documentation.%20In%20past%20Sprints%2C%20well-documented%20featured%20projects%20have%205%20times%20more%20contributions%20than%20other%20projects.%20Details%20about%20each%20item%20and%20more%20information%20about%20how%20to%20create%20them%20are%20%5Bon%20our%20Project%20Requirements%20Page%5D%28https%3A%2F%2Fmozilla.github.io%2Fglobal-sprint%2Fproject-lead%2Fproject-requirements%2F%29.%0D%0A%0D%0A%2A%20%5B%20%5D%20In%20your%20README%2C%20link%20to%20the%20%5BMozilla%20Community%20Participation%20Guidelines%5D%28https%3A%2F%2Fwww.mozilla.org%2Fen-US%2Fabout%2Fgovernance%2Fpolicies%2Fparticipation%2F%29%20or%20write%20your%20own%20code%20of%20conduct.%0D%0A%2A%20%5B%20%5D%20Create%20file%3A%20CONTRIBUTING.md%20so%20others%20know%20how%20they%20can%20contribute.%20If%20you%27d%20like%2C%20you%20can%20%5Bremix%20this%20template%5D%28https%3A%2F%2Fgithub.com%2Facabunoc%2Fmozsprint-repo-template%2Fblob%2Fmaster%2FCONTRIBUTING.md%29%0D%0A%2A%20%5B%20%5D%20%5BFill%20out%20this%20form%5D%28https%3A%2F%2Fwww.mozillapulse.org%2Fadd%29%20to%20submit%20your%20project%20to%20Mozilla%20Pulse.%20Add%20the%20tags%20%60mozsprint%60%20and%20%602018%60.%0D%0A%0D%0AOnce%20all%20of%20the%20above%20is%20complete%2C%0D%0A-%20%5B%20%5D%20Leave%20a%20comment%20with%20the%20text%20%60This%20is%20ready%20to%20be%20featured%20on%20Mozilla%20Pulse%60.%20Your%20wrangler%20will%20review%20this%20issue%20and%20approve%20your%20project%20if%20everything%20looks%20good%20%3Aballoon%3A%0D%0A%0D%0AIf%20you%20get%20stuck%20at%20any%20point%2C%20feel%20free%20to%20look%20at%20the%20%5Brequirements%20page%5D%28https%3A%2F%2Fmozilla.github.io%2Fglobal-sprint%2Fproject-lead%2Fproject-requirements%2F%29%20and%20%5Bproject%20templates%5D%28https%3A%2F%2Fmozilla.github.io%2Fglobal-sprint%2Fproject-lead%2Ftemplates%2F%29.%20We%27re%20here%20to%20help%20you%20through%20this%20process.";
  try
  {
    // You may also replace this with another email address
    var email = "abby@mozillafoundation.org"; //Session.getActiveUser().getEmail();


    var s = SpreadsheetApp.getActiveSheet();
    var headers = s.getRange(1,1,1,s.getLastColumn()).getValues()[0];

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
      + template_notes_to_project_lead;

    var link_base = "https://github.com/mozilla/global-sprint/issues/new?title=" + encodeURIComponent(project);
    var link = link_base + "&body=" + body;
    link = link.replace(/\'/g, '%27');


    var subject = "#mozsprint project - " + project;
    var message = "Dear " + name + ",";

    message += "<p>Thank you for submitting your open project, " + project + ", to Mozilla's Global Sprint 2018 (#mozsprint). ";
    message += "To complete your registraion, you'll need to</p><p>1) Log in to <a href=\"https://github.com/\">GitHub</a>. You can register for free if you don't have an account.</p><p>2) Follow <a href='" + link + "'>this unique link</a> and click on 'Create new issue' to generate a listing for your project:</p>";
    message +="<p><br /><a href='" + link + "' style='font-size:14pt;background:#3bb7ef;padding:10px 15px;color:black;text-decoration:none;margin:10px 0;'>Create Project Listing</a><br /><br /></p>"
    message += "<p>If you run into trouble, check out our <a href='https://mozilla.github.io/global-sprint/project-lead-guide/'>Guide for Project Leads</a>. As the sprint nears, you'll be assigned a \"project wrangler\" -- someone who will help you prepare and answer any questions you may have about your project at the Sprint. So keep an eye on your inbox and your GitHub issue tabs for more information!</p><p>If you have any questions that aren't answered there, feel free to reach out -- email us at <a href='mailto:globalsprint@mozillafoundation.org'>globalsprint@mozillafoundation.org</a>. We're here to help! </p>";
    message += "<p>See you at #mozsprint!<br />Abby and the Global Sprint team</p><br /><hr><br />";
    message += "<p style='font-size:small;color:#666'>Link above didn't work? Make you're logged into GitHub before logging in. Full url here: " + link + "<br /><br />";
    message += "Still have problems? Reply to this email and we'll help you out!</p>"


    // This is the MailApp service of Google Apps Script
    // that sends the email. You can also use GmailApp here.

    MailApp.sendEmail({
     to: reply,
     subject: subject,
     htmlBody: message
    });

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

