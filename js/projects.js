var url = "https://api.mozillapulse.org/entries/?format=json&ordering=-created&search=mozsprint+2017&page_size=100";
var projectList = $(".project-list .projects");

$.ajax({
  url: url,
  dataType: "json",
  type:"GET",
  success:function(json){
     for(project of json["results"]) {
      loadProject(project);
     }
  },
  error:function(xhr, status, error){
     console.error("Error:  " + status +  ": " + error);
  }
});

function loadProject(project){
  projectList.append([
    { project: project }
  ].map(ProjectCard));
}

const ProjectCard = ({ project }) => `
  <div class="card-container col-md-6 col-xs-12">
    <div class="project-card">
      <div class="main-content">
        <div class="thumbnail">
          <div class="img-container">
            <img src="${project["thumbnail"]}">
          </div>
        </div>
        <div class="content">
          <h2>${project["title"]}</h2>
          <div class="mb-2">
            <small class="creator d-block text-muted">By ${project["creators"].join(', ')}</small>
          </div>
          <p class="description">${project["description"]}</p>
          <div><p class="get-involved">${project["get_involved"]} <a href="${project["get_involved_url"]}" target="_blank">Get Involved</a></p><a href="${project["content_url"]}" target="_blank" class="btn btn-block btn-outline-info btn-view">Visit</a></div>
        </div>
      </div>
    </div>
  </div>
`;