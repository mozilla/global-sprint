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

  try
  {
    // You may also replace this with another email address
    var email = "abby@mozillafoundation.org"; //Session.getActiveUser().getEmail();


    var s = SpreadsheetApp.getActiveSheet();
    var headers = s.getRange(1,1,1,s.getLastColumn()).getValues()[0];

    var reply = e.namedValues['Local Host Email'].toString();
    var site = e.namedValues['Site Name'].toString();
    var timezone = e.namedValues['Site Time Zone'].toString();
    var street =  e.namedValues['Site Location - street address'].toString();
    var city =  e.namedValues['Site Location - city'].toString();
    var state =  e.namedValues['Site Location - state / province '].toString();
    var code =  e.namedValues['Postal Code / Zip Code (please include!)'].toString();
    var country =  e.namedValues['Site Location - country'].toString();
    var capactiy =  e.namedValues['Site Capacity (how many people can work at your site during the Sprint) '].toString();
    var available =  e.namedValues["We prefer that sites are open 9am -5pm local time on both May 10 and May 11, during the Sprint. However, if your site can only be open for part of the Sprint, that's OK. If your Site has different hours, tell us when you'll be open during the Sprint. "].toString();
    var name =  e.namedValues["Local Host Name"].toString();
    var twitter =  e.namedValues["Local Host Twitter"].toString();
    var github =  e.namedValues["Local Host Github"].toString();
    var projects =  e.namedValues["Projects at the Sprint are assigned to \"tracks\" related to Internet health issues. If project work at your site will align to a particular track or tracks, please select the track(s) below. "].toString();
    var special =  e.namedValues[" What's unique or special about your site?"].toString();
    var join =  e.namedValues[" Who do you hope will join you at your site?"].toString();

    var row = e.range.getRow();


    var subject = "site registration " + site;
    var message = "Dear " + name + ",";

    message += "\nSite: " + site + "\nTime Zone: " + timezone;


    // This is the MailApp service of Google Apps Script
    // that sends the email. You can also use GmailApp here.

    MailApp.sendEmail({
     to: reply,
     subject: subject,
     htmlBody: message
     // ADD cc:globalsprint@mofo!!
    });

  } catch (e) {
    Logger.log(e.toString());
          MailApp.sendEmail('abby@mozillafoundation.org',
                    'error in mozsprint 2018 host email script. Check the spreadsheet!',
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

