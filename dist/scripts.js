let pokemonRepository=function(){let t=[],n='https://pokeapi.co/api/v2/pokemon/?limit=150';function e(n){t.push(n)}function o(t){a();let n=t.detailsUrl;return fetch(n).then(function(t){return t.json()}).then(function(n){p(),t.imageUrl=n.sprites.front_default,t.height=n.height,t.weight=n.weight,t.types=n.types,t.abilities=n.abilities}).catch(function(t){p(),console.error(t)})}function i(t){o(t).then(function(){!function(t){let n=$('.modal-body'),e=$('.modal-title');e.empty(),n.empty();let o=$('<h1>'+t.name+'</h1>'),i=$('<img class="modal-img">');i.attr('src',t.imageUrl);let a=$('<p>Height : '+t.height+'</p>'),l=$('<p>Weight : '+t.weight+'</p>'),s='';t.types.forEach(function(t){s+=t.type.name+', '});let d=$('<p>Type : '+s+'</p>'),c='';t.abilities.forEach(function(t){c+=t.ability.name+', '});let r=$('<p>Abilities : '+c+'</p>'),u=$('<p class="loading">Loading...</p>');e.append(o),n.append(u),n.append(i),n.append(a),n.append(l),n.append(d),n.append(r),p()}(t)})}function a(){$('.loading').append('Loading...')}function p(){$('.loading').empty()}return{add:e,getAll:function(){return t},addListItem:function(t){let n=$('.pokemon-list'),e=$('<li></li>');e.addClass('group-list-item');let o=$('<button></button>');o.append(t.name),o.addClass('custom-button','btn','btn-primary'),o.attr('data-toggle','modal'),o.attr('data-target','#pokemonModal'),e.append(o),n.append(e),o.on('click',function(){i(t)})},loadList:function(){return a(),fetch(n).then(function(t){return t.json()}).then(function(t){p(),t.results.forEach(function(t){e({name:t.name,detailsUrl:t.url})})}).catch(function(t){p(),console.error(t)})},loadDetails:o,showDetails:i,showLoadingMessage:a,hideLoadingMessage:p}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});
