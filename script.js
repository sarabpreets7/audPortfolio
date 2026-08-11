const profile = {
  name: "Sarabpreet Singh",
  base: "India / Travel-ready",
  languages: "Hindi, English, Punjabi",
  intro:
    "Actor and model available for advertisements, digital campaigns, print shoots, acting roles, and modelling assignments.",
  bio:
    "I am Sarabpreet Singh, an actor and model available for acting roles, advertisements, digital campaigns, print shoots, and modelling assignments. I bring a strong, camera-ready screen presence with a natural look for commercial and character-led briefs.",
  email: "sarabpreets7@gmail.com",
  phone: "+91 98112 90071",
  instagram: "https://www.instagram.com/sarabpreetsingh338/",
  look: ["Age: 26", "Height: 6'2\"", "Weight: 86 kg", "Chest: 42\"", "Waist: 36\"", "Hair: Black", "Eyes: Black"],
  strengths: ["Acting roles", "Commercial ads", "Print shoots", "Fitness look", "Modelling", "Hindi, English, Punjabi"],
};

const photos = [
  {
    title: "Clean Casting Headshot",
    type: "headshot",
    label: "Direct front profile",
    src: "media/photos/1000168608.jpg",
  },
  {
    title: "Athletic Profile",
    type: "commercial",
    label: "Fitness and body language",
    src: "media/photos/1000161587.jpg",
  },
  {
    title: "Side Profile",
    type: "fashion",
    label: "Modelling angle and posture",
    src: "media/photos/1000167538.jpg",
  },
  {
    title: "Strong Character Look",
    type: "commercial",
    label: "Athletic screen presence",
    src: "media/photos/1000152657.jpg",
  },
  {
    title: "Casual Character Look",
    type: "headshot",
    label: "Natural everyday presence",
    src: "media/photos/1000161658.jpg",
  },
  {
    title: "Editorial Casual",
    type: "fashion",
    label: "Outdoor lifestyle frame",
    src: "media/photos/1000161588.jpg",
  },
  {
    title: "Metro Casual",
    type: "commercial",
    label: "Everyday travel and urban look",
    src: "media/photos/metro-casual-profile.jpeg",
  },
];

const clips = [
  {
    title: "Intro Video",
    description: "Short introduction for casting directors.",
    src: "media/videos/intro.mp4",
    poster: "media/photos/intro-poster.jpg",
  },
  {
    title: "Ad Audition",
    description: "Commercial delivery and brand-facing energy.",
    src: "media/videos/ad-audition.mp4",
  },
  {
    title: "Acting Scene",
    description: "Dialogue, expression, and emotional range.",
    src: "media/videos/acting-scene.mp4",
  },
];

const setText = (id, value) => {
  const node = document.getElementById(id);
  if (node) node.textContent = value;
};

const createList = (id, items) => {
  const list = document.getElementById(id);
  if (!list) return;
  list.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
};

const imageExists = (src) =>
  new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(true);
    image.onerror = () => resolve(false);
    image.src = src;
  });

const videoExists = (src) =>
  new Promise((resolve) => {
    const video = document.createElement("video");
    video.onloadedmetadata = () => resolve(true);
    video.onerror = () => resolve(false);
    video.preload = "metadata";
    video.src = src;
  });

const renderPhotos = async (filter = "all") => {
  const grid = document.getElementById("photoGrid");
  if (!grid) return;

  const selected = photos.filter((photo) => filter === "all" || photo.type === filter);
  const cards = await Promise.all(
    selected.map(async (photo) => {
      const hasImage = await imageExists(photo.src);
      const media = hasImage ? `<img src="${photo.src}" alt="${photo.title}" loading="lazy" />` : `<span class="empty-art"></span>`;
      return `
        <article class="photo-card" data-type="${photo.type}">
          ${media}
          <div class="photo-meta">
            <strong>${photo.title}</strong>
            <span>${photo.label}</span>
          </div>
        </article>
      `;
    }),
  );

  grid.innerHTML = cards.join("");
};

const renderClips = async () => {
  const grid = document.getElementById("clipGrid");
  if (!grid) return;

  const cards = await Promise.all(
    clips.map(async (clip) => {
      const hasVideo = await videoExists(clip.src);
      const media = hasVideo
        ? `
            <video controls preload="metadata"${clip.poster ? ` poster="${clip.poster}"` : ""}>
              <source src="${clip.src}" type="video/mp4" />
            </video>
          `
        : `<span class="play-mark" aria-hidden="true"></span>`;

      return `
        <article class="clip-card">
          <div class="clip-media">
            ${media}
          </div>
          <div class="clip-copy">
            <h3>${clip.title}</h3>
            <p>${clip.description}</p>
          </div>
        </article>
      `;
    }),
  );

  grid.innerHTML = cards.join("");
};

const initFilters = () => {
  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter-button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderPhotos(button.dataset.filter);
    });
  });
};

const initCopy = () => {
  const button = document.getElementById("copyProfile");
  if (!button) return;

  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      button.textContent = "Link Copied";
      setTimeout(() => {
        button.textContent = "Copy Profile Link";
      }, 1800);
    } catch {
      button.textContent = "Copy Failed";
    }
  });
};

const initProfile = () => {
  setText("talentName", profile.name);
  setText("baseCity", profile.base);
  setText("languages", profile.languages);
  setText("heroIntro", profile.intro);
  setText("bioText", profile.bio);

  const email = document.getElementById("emailLink");
  const phone = document.getElementById("phoneLink");
  const instagram = document.getElementById("instagramLink");

  if (email) {
    email.textContent = profile.email;
    email.href = `mailto:${profile.email}`;
  }

  if (phone) {
    phone.textContent = profile.phone;
    phone.href = `tel:${profile.phone.replace(/\s/g, "")}`;
  }

  if (instagram) {
    instagram.href = profile.instagram;
  }

  createList("lookDetails", profile.look);
  createList("strengthList", profile.strengths);
};

initProfile();
renderPhotos();
renderClips();
initFilters();
initCopy();
