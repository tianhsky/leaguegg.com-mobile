window.app = window.app || {};
app.models = app.models || {};
app.models.spell = function() {

};
app.models.spell.findById = function(spellId) {
  var spells = app.consts.spell.data;
  var spellKey = _.findKey(spells, function(spell) {
    return spell.id == spellId
  });
  if (_.isEmpty(spellKey)) {
    return {};
  }
  var spell = spells[spellKey];
  spell.img_url = "img/riot/spell/" + spell.name + ".png";
  return spell;
};