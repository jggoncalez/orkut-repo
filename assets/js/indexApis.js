const username = "jggoncalez";
const fr = document.getElementById("friendsCont");

// Busca seguidores do usuário sem token
fetch(`https://api.github.com/users/${username}/followers`)
  .then(response => {
    if (!response.ok) throw new Error("Erro ao buscar seguidores");
    return response.json();
  })
  .then(followers => {
    followers.forEach(follower => {
      const shortLogin = follower.login.slice(0, 8);

      const fig = document.createElement("figure");
      fig.innerHTML = `
        <img src="${follower.avatar_url}" alt="${follower.login}">
        <figcaption>@${shortLogin}</figcaption>
      `;
      fr.appendChild(fig);
    });
  })
  .catch(error => {
    console.error("Erro ao carregar seguidores:", error);
  });

// Busca estatísticas do GitHub
async function getGitHubStats() {
  // Repositórios
  const reposRes = await fetch(`https://api.github.com/users/${username}/repos`);
  const repos = await reposRes.json();
  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);

  // Pull Requests
  const prsRes = await fetch(`https://api.github.com/search/issues?q=author:${username}+type:pr`);
  const prsData = await prsRes.json();

  // Eventos públicos (commits, PRs, issues)
  const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public`);
  const events = await eventsRes.json();

  const commitCount = events.reduce((acc, event) => {
    if (event.type === "PushEvent") {
      return acc + event.payload.commits.length;
    }
    return acc;
  }, 0);

  const contributions = events.reduce((acc, event) => {
    if (event.type === "PushEvent") {
      acc += event.payload.commits.length;
    } else if (event.type === "PullRequestEvent" || event.type === "IssuesEvent") {
      acc += 1;
    }
    return acc;
  }, 0);

  // Atualiza HTML
  document.getElementById("stars").innerHTML = totalStars;
  document.getElementById("prs").innerHTML = prsData.total_count;
  document.getElementById("commits").innerHTML = commitCount;
  document.getElementById("contrib").innerHTML = contributions;
}


// Credly
const certifications = [
    {
        title: "Python Essentials 1",
        issued: "Cisco",
        date: "06/20/2025",
        image: "https://images.credly.com/size/680x680/images/68c0b94d-f6ac-40b1-a0e0-921439eb092e/image.png",
        link: "https://www.credly.com/badges/361332e8-d3fb-429d-adfc-8eda07b00579/public_url",
    }
]

const container = document.getElementById('comm');

certifications.forEach(cert => {
  const figure = document.createElement('figure');
  figure.innerHTML = `
    <img src="${cert.image}" alt="${cert.title}">

  `;
  container.appendChild(figure);
});


getGitHubStats();
