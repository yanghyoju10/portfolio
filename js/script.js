/* =========================
   MOBILE MENU
========================= */

const menuBtn =
  document.getElementById("menuBtn");

const mobileMenu =
  document.getElementById("mobileMenu");

const mobileClose =
  document.getElementById("mobileClose");

const mobileLinks =
  mobileMenu.querySelectorAll("a");


menuBtn.addEventListener("click", () => {

  mobileMenu.classList.add("active");

});


mobileClose.addEventListener("click", () => {

  mobileMenu.classList.remove("active");

});


mobileLinks.forEach(link => {

  link.addEventListener("click", () => {

    mobileMenu.classList.remove("active");

  });

});


/* =========================
   PROJECT MODAL
========================= */

const projectBtn =
  document.getElementById("projectBtn");

const projectModal =
  document.getElementById("projectModal");

const modalClose =
  document.getElementById("modalClose");


projectBtn.addEventListener("click", () => {

  projectModal.classList.add("active");

  document.body.style.overflow = "hidden";

});


modalClose.addEventListener("click", closeModal);


projectModal.addEventListener("click", (event) => {

  if (event.target === projectModal) {

    closeModal();

  }

});


function closeModal() {

  projectModal.classList.remove("active");

  document.body.style.overflow = "";

}


document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {

    closeModal();

  }

});


/* =========================
   PROJECT FILE SYSTEM
========================= */

const projectFileInput =
  document.getElementById("projectFileInput");

const projectFileList =
  document.getElementById("projectFileList");

const saveProjectBtn =
  document.getElementById("saveProjectBtn");

const projectCount =
  document.getElementById("projectCount");


let projectFiles = [];


/* 저장된 프로젝트 불러오기 */

function loadProjectFiles() {

  const saved =
    localStorage.getItem("hyojuProjectFiles");

  if (saved) {

    try {

      projectFiles = JSON.parse(saved);

    } catch {

      projectFiles = [];

    }

  }

  renderProjectFiles();

}


/* 프로젝트 파일 선택 */

projectFileInput.addEventListener(
  "change",
  function () {

    const files =
      Array.from(this.files);


    files.forEach(file => {

      const reader =
        new FileReader();


      reader.onload = function (event) {

        projectFiles.push({

          id:
            Date.now() +
            Math.random(),

          name:
            file.name,

          size:
            file.size,

          type:
            file.type,

          data:
            event.target.result

        });


        renderProjectFiles();

      };


      reader.readAsDataURL(file);

    });


    this.value = "";

  }
);


/* 프로젝트 목록 */

function renderProjectFiles() {

  projectFileList.innerHTML = "";

  projectCount.textContent =
    `${projectFiles.length} FILES`;


  if (projectFiles.length === 0) {

    projectFileList.innerHTML = `

      <div class="file-empty">
        저장된 프로젝트 파일이 없습니다.
      </div>

    `;

    return;

  }


  projectFiles.forEach(file => {

    const item =
      document.createElement("div");

    item.className = "file-item";


    let icon = "📁";


    if (file.type.startsWith("image/")) {

      icon = "🖼️";

    } else if (
      file.type.includes("pdf")
    ) {

      icon = "📕";

    } else if (
      file.type.includes("javascript") ||
      file.name.endsWith(".js")
    ) {

      icon = "JS";

    } else if (
      file.name.endsWith(".html")
    ) {

      icon = "HTML";

    } else if (
      file.name.endsWith(".css")
    ) {

      icon = "CSS";

    }


    let visual;


    if (file.type.startsWith("image/")) {

      visual = `

        <img
          src="${file.data}"
          class="file-preview"
          alt="${escapeHTML(file.name)}"
        >

      `;

    } else {

      visual = `

        <div class="file-icon">
          ${icon}
        </div>

      `;

    }


    item.innerHTML = `

      <div class="file-info">

        ${visual}

        <div>

          <div class="file-name">
            ${escapeHTML(file.name)}
          </div>

          <div class="file-size">
            ${formatFileSize(file.size)}
          </div>

        </div>

      </div>


      <button
        class="file-delete"
        data-id="${file.id}"
        aria-label="프로젝트 파일 삭제"
      >
        ×
      </button>

    `;


    projectFileList.appendChild(item);

  });

}


/* 프로젝트 저장 */

saveProjectBtn.addEventListener(
  "click",
  function () {

    try {

      localStorage.setItem(
        "hyojuProjectFiles",
        JSON.stringify(projectFiles)
      );


      alert(
        "프로젝트 파일이 저장되었습니다."
      );

    } catch (error) {

      alert(
        "저장 공간이 부족합니다.\n" +
        "파일 크기를 줄여주세요."
      );

    }

  }
);


/* 프로젝트 삭제 */

projectFileList.addEventListener(
  "click",
  function (event) {

    if (
      !event.target.classList.contains(
        "file-delete"
      )
    ) {

      return;

    }


    const id =
      Number(event.target.dataset.id);


    projectFiles =
      projectFiles.filter(
        file => file.id !== id
      );


    saveProjectData();

    renderProjectFiles();

  }
);


function saveProjectData() {

  try {

    localStorage.setItem(
      "hyojuProjectFiles",
      JSON.stringify(projectFiles)
    );

  } catch (error) {

    console.log(error);

  }

}


/* =========================
   CAREER FILE SYSTEM
========================= */

const careerFileInput =
  document.getElementById("careerFileInput");

const careerFileList =
  document.getElementById("careerFileList");

const saveCareerBtn =
  document.getElementById("saveCareerBtn");

const careerCount =
  document.getElementById("careerCount");


let careerFiles = [];


/* 저장된 진로 파일 불러오기 */

function loadCareerFiles() {

  const saved =
    localStorage.getItem("hyojuCareerFiles");


  if (saved) {

    try {

      careerFiles = JSON.parse(saved);

    } catch {

      careerFiles = [];

    }

  }


  renderCareerFiles();

}


/* 진로 파일 선택 */

careerFileInput.addEventListener(
  "change",
  function () {

    const files =
      Array.from(this.files);


    files.forEach(file => {

      const reader =
        new FileReader();


      reader.onload = function (event) {

        careerFiles.push({

          id:
            Date.now() +
            Math.random(),

          name:
            file.name,

          size:
            file.size,

          type:
            file.type,

          data:
            event.target.result

        });


        renderCareerFiles();

      };


      reader.readAsDataURL(file);

    });


    this.value = "";

  }
);


/* 진로 파일 표시 */

function renderCareerFiles() {

  careerFileList.innerHTML = "";

  careerCount.textContent =
    `${careerFiles.length} FILES`;


  if (careerFiles.length === 0) {

    careerFileList.innerHTML = `

      <div class="file-empty">
        저장된 진로 파일이 없습니다.
      </div>

    `;

    return;

  }


  careerFiles.forEach(file => {

    const item =
      document.createElement("div");


    item.className =
      "file-item";


    let visual;


    if (file.type.startsWith("image/")) {

      visual = `

        <img
          src="${file.data}"
          class="file-preview"
          alt="${escapeHTML(file.name)}"
        >

      `;

    } else {

      visual = `

        <div class="file-icon">
          📄
        </div>

      `;

    }


    item.innerHTML = `

      <div class="file-info">

        ${visual}

        <div>

          <div class="file-name">
            ${escapeHTML(file.name)}
          </div>

          <div class="file-size">
            ${formatFileSize(file.size)}
          </div>

        </div>

      </div>


      <button
        class="file-delete"
        data-id="${file.id}"
        aria-label="진로 파일 삭제"
      >
        ×
      </button>

    `;


    careerFileList.appendChild(item);

  });

}


/* 진로 파일 저장 */

saveCareerBtn.addEventListener(
  "click",
  function () {

    try {

      localStorage.setItem(
        "hyojuCareerFiles",
        JSON.stringify(careerFiles)
      );


      alert(
        "진로 파일이 저장되었습니다."
      );

    } catch (error) {

      alert(
        "저장 공간이 부족합니다.\n" +
        "파일 크기를 줄여주세요."
      );

    }

  }
);


/* 진로 파일 삭제 */

careerFileList.addEventListener(
  "click",
  function (event) {

    if (
      !event.target.classList.contains(
        "file-delete"
      )
    ) {

      return;

    }


    const id =
      Number(event.target.dataset.id);


    careerFiles =
      careerFiles.filter(
        file => file.id !== id
      );


    saveCareerData();

    renderCareerFiles();

  }
);


function saveCareerData() {

  try {

    localStorage.setItem(
      "hyojuCareerFiles",
      JSON.stringify(careerFiles)
    );

  } catch (error) {

    console.log(error);

  }

}


/* =========================
   COMMON FUNCTIONS
========================= */

function formatFileSize(bytes) {

  if (bytes < 1024) {

    return `${bytes} B`;

  }


  if (bytes < 1024 * 1024) {

    return `${(bytes / 1024).toFixed(1)} KB`;

  }


  return `${(
    bytes /
    (1024 * 1024)
  ).toFixed(1)} MB`;

}


function escapeHTML(text) {

  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
  document.querySelectorAll(
    ".info-card, .timeline-item, .activity-card, .project-small, .project-feature"
  );


const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.style.opacity = "1";

          entry.target.style.transform =
            "translateY(0)";

          observer.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: 0.1
    }
  );


revealElements.forEach(element => {

  element.style.opacity = "0";

  element.style.transform =
    "translateY(30px)";

  element.style.transition =
    "opacity 0.7s ease, transform 0.7s ease";

  observer.observe(element);

});


/* =========================
   START
========================= */

loadProjectFiles();

loadCareerFiles();