async function getPokemon() {
	const url = 'https://pokeapi.co/api/v2/pokemon';
	const options = {
	  method: 'GET',
	  headers: {
		'Content-Type': 'application/json'
	  }
	};
  
	let pokemonCount = 0;
  
	try {
	  const response = await fetch(url, options);
	  if (!response.ok) {
		throw new Error(`Error: ${response.status}`);
	  }
	  const result = await response.json();
  
	  // Создаем контейнер для вывода покемонов
	  const container = document.getElementById('pokemon-container');
  
	  // Добавляем CSS стили
	  container.style.display = 'flex';
	  container.style.flexWrap = 'wrap';
	  container.style.justifyContent = 'center';
  
	  // Выводим всех покемонов
	  let nextUrl = result.next;
	  while (nextUrl) {
		const response = await fetch(nextUrl, options);
		const result = await response.json();
  
		result.results.forEach((pokemon) => {
		  const pokemonCard = document.createElement('div');
		  pokemonCard.style.width = '200px';
		  pokemonCard.style.height = '250px';
		  pokemonCard.style.margin = '20px';
		  pokemonCard.style.border = '1px solid #ccc';
		  pokemonCard.style.borderRadius = '10px';
		  pokemonCard.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
		  pokemonCard.style.display = 'flex';
		  pokemonCard.style.flexDirection = 'column';
		  pokemonCard.style.alignItems = 'center';

		  pokemonCard.addEventListener('mouseover' , () => {
			pokemonCard.style.transform = 'scale(1.1)';
			pokemonCard.style.background = 'black';
			pokemonCard.style.color = 'white';
			pokemonImage.style.background = 'white';
		  });
  
		  pokemonCard.addEventListener('mouseout' , () => {
			pokemonCard.style.transform = 'scale(1)';
			pokemonCard.style.background = 'white';
			pokemonCard.style.color = 'black';
		  });
  
		  const pokemonName = document.createElement('h2');
		  pokemonName.textContent = `${pokemonCount + 1}. ${pokemon.name}`;
		  pokemonName.style.fontSize = '24px';
		  pokemonName.style.fontWeight = 'bold';
		  pokemonName.style.marginBottom = '10px';
  
		  const pokemonImage = document.createElement('img');
		  pokemonImage.style.width = '100px';
		  pokemonImage.style.height = '100px';
		  pokemonImage.style.borderRadius = '10px';
		  pokemonImage.style.marginBottom = '10px';
  
		  // Используем try-catch для обработки ошибок при загрузке изображений
		  try {
			const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/').slice(-2)[0]}.png`;
			pokemonImage.src = imageUrl;
			pokemonImage.alt = pokemon.name;
		  } catch (error) {
			console.error(`Error loading image for ${pokemon.name}: ${error}`);
		  }
  
		  const pokemonType = document.createElement('p');
		  pokemonType.style.fontSize = '18px';
		  pokemonType.style.color = '#666';
  
		  // Получаем тип покемона
		  fetch(pokemon.url)
			.then(response => response.json())
			.then(data => {
			  const types = data.types.map(type => type.type.name).join(', ');
			  pokemonType.textContent = `Type: ${types}`;
			})
			.catch(error => console.error(`Error getting type for ${pokemon.name}: ${error}`));
  
		  // Добавляем элементы на страницу
		  pokemonCard.appendChild(pokemonName);
		  pokemonCard.appendChild(pokemonImage);
		  pokemonCard.appendChild(pokemonType);
		  container.appendChild(pokemonCard);
  
		  pokemonCount++;
		});
  
		nextUrl = result.next;
	  }
  
	  console.log(`Displayed ${pokemonCount} Pokémon`);
	} catch (error) {
	  console.error(error);
	}
  }
  
  // Вызов функции для получения покемона
  getPokemon();