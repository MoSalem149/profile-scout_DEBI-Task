document.addEventListener("DOMContentLoaded", () =>
{
  const apiURL = "https://jsonplaceholder.org/users";
  const userCardsContainer = document.getElementById("user-cards");
  const searchInput = document.getElementById("search");
  const profileModal = document.getElementById("profile-modal");
  const loadMoreBtn = document.getElementById("load-more-btn");
  const modalContent = {
    name: document.getElementById("modal-name"),
    email: document.getElementById("modal-email"),
    company: document.getElementById("modal-company"),
    address: document.getElementById("modal-address"),
    phone: document.getElementById("modal-phone"),
    website: document.getElementById("modal-website"),
    birthDate: document.getElementById("modal-birthDate"),
    username: document.getElementById("modal-username"),
    uuid: document.getElementById("modal-uuid"),
    registered: document.getElementById("modal-registered"),
    geo: document.getElementById("modal-geo"),
  };
  const closeModalButton = document.querySelector(".modal .close");
  let users = [];
  let usersPerPage = 3;

  const getUsers = () =>
  {
    fetch(apiURL)
      .then((response) =>
      {
        if (!response.ok)
        {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) =>
      {
        users = data;
        console.log(users);
        displayUsers(users.slice(0, usersPerPage));
      })
      .catch((error) =>
      {
        console.error("There has been a problem with your fetch operation:", error);
      });
  };

  const displayUsers = (usersToDisplay) =>
  {
    userCardsContainer.innerHTML = "";
    usersToDisplay.forEach((user) =>
    {
      const userCard = document.createElement("div");
      userCard.classList.add("card");
      userCard.dataset.id = user.id;
      userCard.innerHTML = `
        <h3><i class="fas fa-user"></i> ${user.firstname} ${user.lastname}</h3>
        <p><i class="fas fa-envelope"></i> Email: ${user.email}</p>
        <p><i class="fas fa-map-marker-alt"></i> Address: ${user.address.street}, ${user.address.city}</p>
        <p><i class="fas fa-phone"></i> Phone: ${user.phone}</p>
        <p><i class="fas fa-building"></i> Company: ${user.company.name}</p>
        <button class="more-info-btn"><i class="fas fa-info-circle"></i> More Info</button>
      `;
      userCard
        .querySelector(".more-info-btn")
        .addEventListener("click", () => openModal(user));
      userCardsContainer.appendChild(userCard);
    });
  };

  const openModal = (user) =>
  {
    modalContent.name.innerHTML = `<i class="fas fa-user"></i> ${user.firstname} ${user.lastname}`;
    modalContent.email.innerHTML = `<i class="fas fa-envelope"></i> Email: ${user.email}`;
    modalContent.company.innerHTML = `<i class="fas fa-building"></i> Company: ${user.company.name}, ${user.company.catchPhrase}, ${user.company.bs}`;
    modalContent.address.innerHTML = `<i class="fas fa-map-marker-alt"></i> Address: ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;
    modalContent.phone.innerHTML = `<i class="fas fa-phone"></i> Phone: ${user.phone}`;
    modalContent.website.innerHTML = `<i class="fas fa-globe"></i> Website: ${user.website}`;
    modalContent.birthDate.innerHTML = `<i class="fas fa-birthday-cake"></i> Birth Date: ${user.birthDate}`;
    modalContent.username.innerHTML = `<i class="fas fa-user-circle"></i> Username: ${user.login.username}`;
    modalContent.uuid.innerHTML = `<i class="fas fa-id-card"></i> UUID: ${user.login.uuid}`;
    modalContent.registered.innerHTML = `<i class="fas fa-calendar-check"></i> Registered: ${user.login.registered}`;
    modalContent.geo.innerHTML = `<i class="fas fa-map"></i> Location: Lat ${user.address.geo.lat}, Lng ${user.address.geo.lng}`;
    profileModal.style.display = "flex";
  };

  const closeModal = () =>
  {
    profileModal.style.display = "none";
  };

  const loadMoreUsers = () =>
  {
    const displayedUsers = users.slice(0, usersPerPage + 3);
    usersPerPage += 3;
    displayUsers(displayedUsers);
  };

  searchInput.addEventListener("input", (e) =>
  {
    const query = e.target.value.trim();
    if (query === "")
    {
      displayUsers(users.slice(0, usersPerPage));
    } else
    {
      const filteredUsers = users.filter((user) =>
        (user.firstname + " " + user.lastname)
          .toLowerCase()
          .includes(query.toLowerCase())
      );
      displayUsers(filteredUsers.slice(0, usersPerPage));
    }
  });

  loadMoreBtn.addEventListener("click", loadMoreUsers);
  closeModalButton.addEventListener("click", closeModal);
  window.addEventListener("click", (e) =>
  {
    if (e.target === profileModal)
    {
      closeModal();
    }
  });

  getUsers();
});
