(function(){

  const form = document.querySelector('.searchForm');

  form.addEventListener('submit', handleSubmit);
  
  function handleSubmit(event) {
      event.preventDefault();
      const input = document.querySelector('.searchForm-input').value;
      const searchQuery = input.trim();
      fetchResults(searchQuery);
    }
  
    function fetchResults(searchQuery) {
      const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    
      fetch(endpoint)
      .then(response => response.json())
      .then(data => {
          const results = data.query.search[0];
          displayResults(results);
          
      })
      .catch(() => console.log('An error occurred'));
    }
  
    function displayResults(results) {
      const searchResults = document.querySelector('.searchResults');
      searchResults.innerHTML = '';
       const url = encodeURI(`https://en.wikipedia.org/wiki/${results.title}`);
    
       searchResults.insertAdjacentHTML('beforeend',
          `<div class="resultItem">
            <h3 class="resultItem-title">
              <a href="${url}" target="_blank" rel="noopener">${results.title}</a>
            </h3>
            <span class="resultItem-snippet">${results.snippet}</span><br>
          </div>`
        );
    }
  

})();
