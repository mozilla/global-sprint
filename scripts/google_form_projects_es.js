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


// Returns true if the cell where cellData was read from is empty.
// Arguments:
//   - cellData: string
function isCellEmpty_(cellData) {
  return typeof(cellData) == "string" && cellData == "";
}


function SendGoogleForm(e)
{
  var getTrack = {
  "ALFABETIZACIÓN WEB: Proyectos que enseñen a las personas habilidades para crear — y no solo consumir — la web" : "ALFABETIZACIÓN WEB",
  "APERTURA: Proyectos que protejan las tecnologías que hacen que la web sea transparente y accesible, y permitan que cualquiera pueda crear sin pedir permiso": "APERTURA",
  "PRIVACIDAD Y SEGURIDAD: Proyectos que muestren lo que pasa con nuestra información personal en línea, y cómo hacer que Internet sea más seguro para todos": "PRIVACIDAD Y SEGURIDAD",
  "INCLUSIÓN DIGITAL: Proyectos que aseguren que todos tengan igualdad de oportunidades para acceder a Internet, y puedan usarlo para mejorar sus vidas y sociedades": "INCLUSIÓN DIGITAL",
  "DECENTRALIZACIÓN: Proyectos que protejan y aseguren un Internet controlado por todos, de manera que ningún actor pueda adueñarse, controlarlo o apagarlo": "DECENTRALIZACIÓN"
  };

  var template_start = "%3C%21---%20Deja%20todo%20lo%20que%20est%C3%A1%20abajo%20y%20da%20click%20en%20%27Submit%20new%20issue%27%20%20---%3E%0D%0A%0D%0A%2A%2A%5B%20Contacto%20del%20Proyecto%20%5D%2A%2A%20";
  var template_contribute = "%2A%2A%2A%0D%0A%0D%0A%23%23%20%C2%BFQuieres%20contribuir%20a%20este%20proyecto%20durante%20el%20%23mozsprint%3F%0D%0A%C3%9Anete%20a%20nosotros%20en%20el%20Global%20Sprint%2C%20Mayo%2010-11.%20%C2%A1Deja%20un%20comentario%20abajo%20si%20te%20interesa%20contribuir%20a%20este%20proyecto%20durante%20el%20%23mozsprint%202018%21%0D%0A%0D%0A%2A%2A%2A%0D%0A%0D%0A%23%23%20Nota%20para%20el%20L%C3%ADder%20de%20Proyecto%20%3Atada%3A%0D%0A%C2%A1Felicidades%2C%20";
  var template_pl_a = "%21%20Este%20es%20el%20listado%20oficial%20de%20tu%20proyecto%20para%20el%20Mozilla%20Global%20Sprint%202018.%20Para%20confirmar%20tu%20registro%2C%20por%20favor%20completa%20y%20marca%20lo%20siguiente%3A%0D%0A%0D%0A-%20%5B";
  var template_pl_b = "%5D%20Completa%20el%20curso%20%5BOpen%20Leadership%20101%5D%28https%3A%2F%2Fmozilla.teachable.com%2Fp%2Fopen-leadership-101%29%0D%0A-%20%5B";
  var template_pl_c = "%5D%20Proporciona%20en%20un%20comentario%20un%20repositorio%20de%20GitHub%20para%20trabajo%20y%20discusi%C3%B3n%20sobre%20tu%20proyecto%20";
  var template_pl_d = "%20%0D%0A%20%20-%20%C2%BFnuevo%20en%20GitHub%3F%20%20Aqu%C3%AD%20hay%20una%20%5Bgu%C3%ADa%20paso%20a%20paso%20de%20c%C3%B3mo%20usar%20la%20plantilla%20del%20%23mozsprint%5D%28https%3A%2F%2Fmozilla.github.io%2Fglobal-sprint%2Fproject-lead-guide%2Ftemplates%2F%29";
  var template_pl_e = "%0D%0A-%20%5B%20%5D%20Crea%20un%20archivo%20README%20en%20el%20repositorio%20de%20tu%20proyecto.%20Este%20archivo%20ayudar%C3%A1%20a%20los%20reci%C3%A9n%20llegados%20a%20entender%20cu%C3%A1l%20es%20tu%20proyecto%2C%20porque%20es%20importante%2C%20y%20la%20ayuda%20que%20est%C3%A1s%20buscando.%0D%0A-%20%5B%20%5D%20%5BCrea%20el%20archivo%3A%20LICENSE%5D%20%28http%3A%2F%2Fchoosealicense.com%2F%29%20para%20asignar%20a%20tu%20proyecto%20una%20licencia%20abierta%2C%20permitiendo%20que%20pueda%20compartirse%20y%20remezclarse.%0D%0A-%20%5B%20%5D%20Activa%20el%20%5BIssue%20Tracker%5D%28https%3A%2F%2Fmozilla.github.io%2Fglobal-sprint%2Fproject-lead-guide%2Ftemplates%2F%234-create-issues%29%20y%20crea%20al%20menos%20tres%20issues%20para%20describir%20cada%20tarea%20en%20la%20que%20necesitas%20ayuda%20y%20c%C3%B3mo%20un%20contribuidor%20puede%20empezar%20con%20esa%20tarea.%0D%0A-%20%5B%20%5D%20%5BCrea%20una%20etiqueta%5D%28https%3A%2F%2Fmozilla.github.io%2Fglobal-sprint%2Fproject-lead-guide%2Ftemplates%2F%235-add-a-mozsprint-label%29%20llamada%20%60mozsprint%60%20y%20as%C3%ADgnala%20a%20tus%20issues.%0D%0A%0D%0A%23%23%23%23%20Lista%20de%20verificaci%C3%B3n%20para%20Proyectos%20DESTACADOS%20%3Aclipboard%3A%0D%0APara%20tener%20tu%20proyecto%20DESTACADO%20en%20%5BMozilla%20Pulse%5D%28http%3A%2F%2Fmozillapulse.org%2F%29%2C%20completa%20la%20siguiente%20documentaci%C3%B3n.%20En%20los%20Sprints%20pasados%2C%20los%20proyectos%20bien%20documentados%20tienen%205%20veces%20m%C3%A1s%20contribuciones%20que%20otros%20proyectos.%20Detalles%20de%20cada%20item%20y%20m%C3%A1s%20informaci%C3%B3n%20sobre%20como%20crearlos%20puedes%20encontrarla%20%5Ben%20nuestra%20P%C3%A1gina%20de%20Requerimientos%5D%28https%3A%2F%2Fmozilla.github.io%2Fglobal-sprint%2Fproject-lead-guide%2Fproject-requirements%2F%29.%0D%0A%0D%0A%2A%20%5B%20%5D%20En%20tu%20archivo%20README%2C%20pon%20un%20link%20a%20las%20%5BGuias%20de%20participaci%C3%B3n%20en%20la%20comunidad%20de%20Mozilla%5D%28https%3A%2F%2Fwww.mozilla.org%2Fes-ES%2Fabout%2Fgovernance%2Fpolicies%2Fparticipation%2F%29%20o%20escribe%20un%20c%C3%B3digo%20de%20conducta%20propio.%0D%0A%2A%20%5B%20%5D%20Crea%20el%20archivo%3A%20CONTRIBUTING.md%20as%C3%AD%20los%20demas%20podr%C3%A1n%20saber%20como%20participar.%20Si%20lo%20deseas%20puedes%20%5Bremezclar%20este%20template%5D%28https%3A%2F%2Fgithub.com%2Facabunoc%2Fmozsprint-repo-template%2Fblob%2Fmaster%2FCONTRIBUTING_es.md%29%0D%0A%2A%20%5B%20%5D%20%5BLlena%20esta%20forma%5D%28https%3A%2F%2Fwww.mozillapulse.org%2Fadd%29%20para%20agregar%20tu%20proyecto%20a%20Mozilla%20Pulse.%20Agrega%20las%20etiquetas%20%20%60mozsprint%60%20y%20%602018%60.%0D%0A%0D%0AUna%20vez%20que%20todo%20lo%20anterior%20este%20completo%2C%0D%0A-%5B%5D%20Deja%20un%20comentario%20con%20el%20texto%20%E2%80%98Listo%20para%20aparecer%20en%20Mozilla%20Pulse%E2%80%99.%20El%20encargado%20revisar%C3%A1%20el%20issue%20y%20aprobar%C3%A1%20tu%20proyecto%20si%20no%20hay%20ning%C3%BAn%20problema.%20balloon%3A%0D%0A%0D%0ASi%20te%20atoras%20en%20alg%C3%BAn%20punto%2C%20no%20dudes%20en%20consultar%20la%20%5Bp%C3%A1gina%20de%20requerimientos%5D%20%28https%3A%2F%2Fmozilla.github.io%2Fglobal-sprint%2Fproject-lead-guide%2Fproject-requirements%2F%29%20y%20la%20%5Bplantilla%20de%20proyectos%5D%28https%3A%2F%2Fmozilla.github.io%2Fglobal-sprint%2Fproject-lead-guide%2Ftemplates%2F%29%20o%20contacta%20a%20uno%20te%20los%20coaches%20de%20proyectos%20%40mattdark%20y%20%40lasr21%20.%20%C2%A1Estamos%20aqu%C3%AD%20para%20ayudarte%20en%20el%20proceso%21";

  try
  {
    // You may also replace this with another email address
    var email = "abby@mozillafoundation.org"; //Session.getActiveUser().getEmail();

    var s = SpreadsheetApp.getActiveSheet();
    var headers = s.getRange(1,1,1,s.getLastColumn()).getValues()[0];
    var dataRange = s.getRange(s.getFrozenRows()+1, 1, s.getMaxRows(), s.getMaxColumns());


    var reply = e.namedValues['Email'].toString();
    var project = e.namedValues['Título del Proyecto'].toString();
    var name =  e.namedValues['Nombre'].toString();
    var row = e.range.getRow();

    var github = e.namedValues['GitHub ID'].toString();
    github = formatGitHubId(github) || name;
    var link = e.namedValues['Enlace del Proyecto'];
    if(link) { link = link.toString(); }
    var track = e.namedValues['Selecciona una o más categorías para tu proyecto'];
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

    var ol101 = e.namedValues['¿Has tomado el curso (1 hora) en línea Open Leadership 101?'];
    if(ol101) { ol101 = ol101.toString(); }

    var location = e.namedValues['¿Cuál es tu ubicación física y zona horaria?'];
    if(location) { location = location.toString(); }
    var description =  e.namedValues['Descripción del Proyecto'].toString();
    var body = template_start
      + encodeURIComponent(github)
      + encodeURIComponent("\n**[ Repositorio de GitHub ]** " + link)
      + encodeURIComponent("\n**[ Categoría ]** " + track)
      + encodeURIComponent("\n**[ Ubicación ]** " + location)
      + encodeURIComponent("\n**[ Coaches ]** @mattdark y @lasr21")
      + encodeURIComponent("\n\n### Descripción\n" + description + "\n")
      + template_contribute
      + encodeURIComponent(github)
      + template_pl_a;
    body += (ol101 == "¡Sí! Ya he tomado Open Leadership 101") ? "x" : "+";
    body += template_pl_b;
    body += link ? "x" : "+";
    body += template_pl_c;
    body += link ? "" : template_pl_d;
    body += template_pl_e;

    var link_base = "https://github.com/mozilla/global-sprint/issues/new?title=" + encodeURIComponent(project);
    var link = link_base + "&body=" + body;
    link = link.replace(/\'/g, '%27');


    var subject = "Proyecto en #mozsprint - " + project;
    var message = "Estimado " + name + ",";

    message += "<p>Muchas gracias por enviar tu proyecto " + project + " al Mozilla Global sprint 2018 (#mozsprint). ";
    message += "Para completar tu registro, necesitas realizar los siguientes pasos:</p><p>1) Inicia sesión en <a href=\"https://github.com/\">GitHub</a>. Si no tienes una cuenta puedes registrarte gratis.</p><p>2) Sigue <a href='" + link + "'>este enlace único</a> y da click en 'Submit new issue’ para listar tu proyecto.";
    message +="<p><br /><a href='" + link + "' style='font-size:14pt;background:#3bb7ef;padding:10px 15px;color:black;text-decoration:none;margin:10px 0;'>Crear listado de proyectos</a><br /><br /></p>"
    message += "<p>Si tienes algún problema revisa nuestra <a href='https://mozilla.github.io/global-sprint/project-lead-guide/'>guía para líderes de proyecto</a>."
    message += " Mario y Luis (copiados) son los coaches de proyectos en español en el sprint. Ellos te pueden ayudar a preparar tu proyecto y responder todas tus dudas que puedas tener."

    message += "</p><p>Si tienes alguna pregunta, no dudes en contactarnos por email en <a href='mailto:globalsprint@mozillafoundation.org'>globalsprint@mozillafoundation.org</a>";
    message += " o comunícate con alguno de los coaches. ¡Estamos para ayudarte! </p>";
    message += "<p>Nos vemos en el #mozsprint!<br />Abby, Mario, Luis y el equipo del Global Sprint.";

    message += "<p style='font-size:small;color:#666'>¿El link de arriba no funciona?, asegúrate de iniciar sesión en GitHub antes de entrar. URL completa aquí:  " + link + "<br /><br />";
    message += "Todavía tienes problemas? ¡Responda a este correo electrónico y lo ayudaremos!</p>"


    // This is the MailApp service of Google Apps Script
    // that sends the email. You can also use GmailApp here.

    var mailConfig = {
     to: reply,
     subject: subject,
     htmlBody: message
    };
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

