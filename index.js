const urlShop = "https://fortnite-api.com/v2/shop/br?language=es-419";
const dateShop = document.getElementById("date-shop");
const sectionDaily = document.getElementById("daily");
const txtCountDownTimerDaily = document.createElement("h3");
const sectionSpecialFeatured = document.getElementById("specialFeatured");

function getItemsDaily() {
  fetch(urlShop)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);

      // Fecha de actualización
      dateShop.textContent = new Date(data.data.date).toLocaleString("es-CO", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
      });

      // Imagen paVos
      const vbucksIcon = document.createElement("img");
      vbucksIcon.src = data.data.vbuckIcon;
      vbucksIcon.classList = "vbucksicon";

      // Obtener objetos diarios
      const daily = data.data.daily;
      const dailyItems = daily.entries;
      const titleDaily = document.createElement("h2");
      const listItemsDaily = document.createElement("ul");
      const fragDaily = document.createDocumentFragment();
      titleDaily.textContent = "DIARIOS";
      fragDaily.appendChild(titleDaily);
      fragDaily.appendChild(txtCountDownTimerDaily);
      fragDaily.appendChild(listItemsDaily);

      dailyItems.forEach((item) => {
        // Obtener precio de objeto
        const spanPrice = document.createElement("span");
        spanPrice.classList = "price";
        spanPrice.textContent = item.finalPrice;
        spanPrice.appendChild(vbucksIcon.cloneNode(true));

        // Obtener nombre e imagen del objeto
        const listItem = document.createElement("li");
        listItem.textContent = item.items[0].name;
        listItem.classList = item.items[0].rarity.value;
        listItem.appendChild(spanPrice);

        const listItemImg = document.createElement("img");
        listItemImg.classList = "iconImg";
        listItemImg.src = item.items[0].images.icon;

        listItem.appendChild(listItemImg);
        listItemsDaily.appendChild(listItem);
      });
      sectionDaily.appendChild(fragDaily);
    });
}

function countDownTimer(element) {
  setInterval(() => {
    const actualTime = new Date();
    const remainingHours = 23 - actualTime.getUTCHours();
    const remainingMinutes = 59 - actualTime.getUTCMinutes();
    const remainingSeconds = 59 - actualTime.getUTCSeconds();
    element.textContent = `Próxima actualización ${
      remainingHours < 10 ? `0${remainingHours}` : remainingHours
    }:${remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes}:${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }`;
    if (
      remainingHours === 0 &&
      remainingMinutes === 0 &&
      remainingSeconds === 0
    ) {
      window.location.reload();
      return;
    }
  }, 1000);
}

countDownTimer(txtCountDownTimerDaily);
getItemsDaily();
