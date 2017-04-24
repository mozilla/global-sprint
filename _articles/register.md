---
layout: page
title: REGISTER
---
<link href="https://s3.amazonaws.com/mozillascience/mapglyphs/mapglyphs.css" rel="stylesheet">

<iframe width="100%" height="520" frameborder="0" src="https://auremoser.carto.com/builder/c0eef4b4-250c-11e7-b012-0e05a8b3e3d7/embed" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

Find a site near you!

<div class="row map-sites">
{% for country in site.data.sites %}
  <div class="col-lg-3 col-sm-4 col-xs-6">
  <i class="mg mg-5x map-{{ country[1][0].countryCode | downcase }}"></i>
  <hr >
  <h4>{{ country[0] }}</h4>
  {% for host in country[1] %}
    {% if host.linkToTito %}
      <div><a target="_blank" href="{{ host.linkToTito }}">{{ host.siteLocationCity }}, {{ host.siteLocationStateProvince}}</a></div>
    {% endif %}
  {% endfor %}
  </div>
{% endfor %}

  <div class="col-lg-3 col-sm-4 col-xs-6">
  <i class="mg mg-5x map-glb-am"></i>
  <hr >
  <h4>Virtual</h4>
  <div><a target="_blank" href="/">Virtual Participant</a></div>
  </div>

</div>

Don't see a site near you? You can also [join virtually]()!

Map Icons by [MapGlyphs.com](http://mapglyphs.com/) CC BY-ND 3.0