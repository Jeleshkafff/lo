(function () {
  let array = [
    {
      name: "sdf",
      surname: "sdf",
      lastname: "sdf",
      birthDate: new Date("2004-01-23"),
      startYear: 2020,
      faculty: "sdf",
    },
    {
      name: "dsf",
      surname: "fgh",
      lastname: "sa",
      birthDate: new Date("2003-08-15"),
      startYear: 2021,
      faculty: "asd",
    },
  ];

  function createTitle(name) {
    let title = document.createElement("H1");
    title.classList.add("title");

    title.textContent = name;

    return title;
  }

  function createForm(className) {
    let form = document.createElement("form");
    form.classList.add(className);

    return form;
  }

  function createInput() {
    let input = document.createElement("input");
    input.classList.add("inp");

    return input;
  }

  function createButton(className) {
    let button = document.createElement("button");
    button.classList.add(className);

    return button;
  }

  function createTable() {
    let table = document.createElement("table");
    table.classList.add("studTable");

    return table;
  }

  function calcAge(arrElem) {
    let bitrhObj = new Date(arrElem.birthDate);
    let today = new Date();
    let currentBirth = new Date(
      today.getFullYear(),
      bitrhObj.getMonth(),
      bitrhObj.getDay()
    );
    let date;
    if (String(bitrhObj.getMonth() + 1).length == 2) {
      date =
        bitrhObj.getDate() +
        "." +
        Number(bitrhObj.getMonth() + 1) +
        "." +
        bitrhObj.getFullYear();
    } else if (String(bitrhObj.getMonth() + 1).length == 1) {
      date =
        bitrhObj.getDate() +
        "." +
        "0" +
        Number(bitrhObj.getMonth() + 1) +
        "." +
        bitrhObj.getFullYear();
    }

    let age = today.getFullYear() - bitrhObj.getFullYear();
    if (today < currentBirth) {
      age -= 1;
    }

    return {
      age,
      date,
    };
  }

  function studentForm(array = [], key) {
    array = JSON.parse(localStorage.getItem(key)) || array;
    localStorage.setItem(key, JSON.stringify(array));

    let div = document.querySelector(".addForm");

    let title = createTitle("Adding a student");
    div.append(title);

    let form = createForm("addForm");
    div.append(form);

    for (let key in array[0]) {
      let p = document.createElement("p");
      p.classList.add("titleName");

      switch (key) {
        case "name":
          p.textContent = "Name";
          break;
        case "surname":
          p.textContent = "surname";
          break;
        case "lastname":
          p.textContent = "lastname";
          break;
        case "birthDate":
          p.textContent = "Date of Birth";
          break;
        case "startYear":
          p.textContent = "Starting year";
          break;
        case "faculty":
          p.textContent = "faculty";
          break;
      }
      form.append(p);

      let input = createInput();
      input.id = key;
      form.append(input);
    }

    let birthDate = document.querySelector("#birthDate");
    birthDate.setAttribute("type", "date");

    let button = createButton("addBtn");
    button.addEventListener("click", () => {
      let check = true;
      let inputs = document.querySelectorAll(".inp");
      let startYear = document.querySelector("#startYear");

      for (input of inputs) {
        if (input.value.trim() == "") {
          alert("Please fill in all fields");
          check = false;
          break;
        }
      }
      if (
        new Date(birthDate.value) < new Date("01.01.1900") ||
        new Date(birthDate.value) > new Date()
      ) {
        alert("date of birth entered incorrectly");
        check = false;
      }
      if (startYear.value < 2000) {
        alert(" year of study start entered incorrectly");
        check = false;
      }

      if (check) {
        array.push({
          name: inputs[0].value,
          surname: inputs[1].value,
          lastname: inputs[2].value,
          birthDate: new Date(inputs[3].value),
          startYear: inputs[4].value,
          faculty: inputs[5].value,
        });
        localStorage.setItem(key, JSON.stringify(array));

        inputs.forEach((element) => {
          element.value = "";
        });

        alert("Student successfully added to table");
      }
    });

    button.textContent = "add";
    div.append(button);
  }

  function showStudents(array = [], key) {
    array = JSON.parse(localStorage.getItem(key)) || array;
    localStorage.setItem(key, JSON.stringify(array));

    let main = document.querySelector(".students");

    let table = createTable();
    main.append(table);

    let tr = document.createElement("tr");
    tr.id = `0id`;
    table.append(tr);

    let tdFio = document.createElement("td");
    tdFio.textContent = "Full name";
    tr.append(tdFio);

    let tdFaculty = document.createElement("td");
    tdFaculty.textContent = "Faculty";
    tr.append(tdFaculty);

    let tdBirth = document.createElement("td");
    tdBirth.textContent = "Age";
    tr.append(tdBirth);

    let tdYears = document.createElement("td");
    tdYears.textContent = "years of education";
    tr.append(tdYears);

    for (let i = 0; i < array.length; i++) {
      let tr = document.createElement("tr");
      tr.id = `${i + 1}id`;
      table.append(tr);

      let tdFio = document.createElement("td");
      tdFio.textContent =
        array[i].surname + " " + array[i].name + " " + array[i].lastname;
      tr.append(tdFio);

      let tdFaculty = document.createElement("td");
      tdFaculty.textContent = array[i].faculty;
      tr.append(tdFaculty);

      let tdBirth = document.createElement("td");
      let age = calcAge(array[i]);
      tdBirth.textContent = age.date + ` (${age.age})`;
      tr.append(tdBirth);

      let tdYears = document.createElement("td");
      let endYear = Number(array[i].startYear) + 4;
      tdYears.textContent = `${array[i].startYear}-${endYear}`;
      if (new Date(endYear, 9, 1) < new Date()) {
        tdYears.textContent = `${array[i].startYear}-${endYear} (graduated from training)`;
      }
      tr.append(tdYears);
    }
  }

  window.studentForm = studentForm;
  window.arr = array;
  window.showStud = showStudents;
})();
