let plugin = LiteMol.Viewer.createInstance(
  target=document.getElementById('app'),
  layoutState={
    isExpanded: true,
    hideControls: true
  },
  ignoreUrlParams=true);

function getParam(name, regex) {
  var r = new RegExp(name + "=(" + regex + ")[&]?", 'i');
  return decodeURIComponent(((window.location.search || '').match(r) || [])[1] || '');
};

let pdbid = getParam('pdbid', '[a-z0-9]+').toLowerCase().trim();
let t = plugin.createTransform().add(
  plugin.root,
  LiteMol.Viewer.PDBe.Data.DownloadMolecule,
  {id: pdbid});
plugin.applyTransform(t);
