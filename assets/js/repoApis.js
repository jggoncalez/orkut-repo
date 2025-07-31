const username = "jggoncalez";
const repcont = document.getElementById("repos-container");

fetch(`https://api.github.com/users/${username}/repos`, {
  headers: {
    Authorization: `token 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`
  }
})
  .then(response => response.json())
  .then(repos => {
    const ordenados = repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    const top = ordenados.slice(0, 10);

    top.forEach(repo => {
      const div = document.createElement("div");
      div.classList.add("repo-test");
      div.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "Sem descrição"}</p>
        <div class="repo-details">
            <figure>
                <p>Language</p>
                <p>${repo.language || "N/A"}</p>
            </figure>
            <figure>
                <p>Stars</p>
                <p>${repo.stargazers_count}</p>
            </figure>
            <figure>
                <p>Watching</p>
                <p>${repo.watchers_count}</p>
            </figure>
            <figure>
                <p>Forks</p>
                <p>${repo.forks}</p>
            </figure>
        </div>
      `;

      repcont.appendChild(div);
    });
  })
  .catch(error => console.error("Erro ao carregar repositórios:", error));