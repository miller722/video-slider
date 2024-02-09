// Creating a Swiper instance for the main slider
const mainSwiper = new Swiper("#mainSwiper", {
  // Optional parameters

  centeredSlides: "true",

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Vimeo video objects
const vimeoVideos = [
  {
    id: "video1",
    url: "https://player.vimeo.com/video/824804225",
    width: 240,
  },
  {
    id: "video2",
    url: "https://player.vimeo.com/video/824804225",
    width: 240,
  },
  {
    id: "video3",
    url: "https://player.vimeo.com/video/824804225",
    width: 240,
  },
  {
    id: "video4",
    url: "https://player.vimeo.com/video/824804225",
    width: 240,
  },
  {
    id: "video5",
    url: "https://player.vimeo.com/video/824804225",
    width: 240,
  },
  {
    id: "video6",
    url: "https://player.vimeo.com/video/824804225",
    width: 240,
  },
  {
    id: "video7",
    url: "https://player.vimeo.com/video/824804225",
    width: 240,
  },
  {
    id: "video8",
    url: "https://player.vimeo.com/video/824804225",
    width: 240,
  },
];

// Creating Vimeo players and assigning event handlers
vimeoVideos.forEach(function (video) {
  const player = new Vimeo.Player(video.id, {
    url: video.url,
    width: video.width,
  });

  // Setting volume
  player.setVolume(0);

  // Play event handler
  player.on("play", function () {
    console.log("Played the video with ID: " + video.id);
  });
});

// Getting all video containers within the modal slider
const modalVideos = document.querySelectorAll(".swiper-slide .video__wrapper");

// Assigning click handler for each video container
modalVideos.forEach(function (videoDiv, index) {
  const videoData = vimeoVideos[index];
  videoDiv.setAttribute("data-url", videoData.url);
  videoDiv.setAttribute("data-index", index);
  videoDiv.addEventListener("click", function (event) {
    event.stopPropagation();
    const videoUrl = videoDiv.getAttribute("data-url");
    const id = videoDiv.getAttribute("id");
    const index = videoDiv.getAttribute("data-index");
    openPopup(videoUrl, id, index);
  });
});

// Function to open the video popup
function openPopup(videoUrl, id, index) {
  const mainSwiperID = document.querySelector("#mainSwiper");
  const modalSwiperID = document.querySelector("#modalSwiper");
  const wrapperElement = document.querySelector(".modal-swiper__wrapper");

  // Displaying the wrapper element to show the modal
  wrapperElement.style.display = "block";

  // Adding a click event listener to the modal swiper container
  // This prevents clicks inside the modal swiper from closing the modal
  modalSwiperID.addEventListener("click", function (event) {
    // Preventing the click event from bubbling up to the document level
    event.stopPropagation();
  });
  // Creating a Swiper instance for the modal slider
  const modalSwiper = new Swiper("#modalSwiper", {
    on: {
      init: function () {
        const player = new Vimeo.Player(id + "-popup", {
          url: videoUrl,
          width: 600,
          autoplay: true,
        });

        player.setVolume(0);

        player.on("play", function () {
          console.log("Played the video with ID: " + id + "-popup");
        });
      },
    },
    // Optional parameters
    centeredSlides: "true",
    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    initialSlide: index,
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // Slide change event handler for the modal slider
  modalSwiper.on("slideChange", function (event) {
    const vimeoVideosObject = vimeoVideos[event.activeIndex];
    const player = new Vimeo.Player(vimeoVideosObject.id + "-popup", {
      url: vimeoVideosObject.url,
      width: 600,
      autoplay: true,
    });

    player.setVolume(0);

    player.on("play", function () {
      console.log(
        "Played the video with ID: " + vimeoVideosObject.id + "-popup"
      );
    });
  });
}

// Click event handler for document to close the modal
document.addEventListener("click", function (event) {
  const wrapperElement = document.querySelector(".modal-swiper__wrapper");
  if (wrapperElement.style.display === "block") {
    wrapperElement.style.display = "none";
  }
});
