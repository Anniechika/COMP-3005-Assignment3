document.getElementById("studentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const studentId = document.getElementById("studentId").value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const enrollmentDate = document.getElementById("enrollmentDate").value;

  if (studentId) {
    updateStudentEmail(studentId, email);
  } else {
    addStudent(firstName, lastName, email, enrollmentDate);
  }
});

function getAllStudents() {
  console.log("clicked!");
  fetch("http://localhost:3000/students")
    .then((response) => response.json())
    .then((data) => {
      const list = document.getElementById("studentsList");
      list.innerHTML = "";
      data.forEach((student) => {
        const item = document.createElement("div");
        item.textContent = `ID: ${student.student_id}, Name: ${student.first_name} ${student.last_name}, Email: ${student.email}, Enrollment Date: ${student.enrollment_date}`;
        list.appendChild(item);
      });
    });
}
document.getElementById("studentForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission

  // Capture the input values from the form
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const enrollmentDate = document.getElementById("enrollmentDate").value;

  // Call the addStudent function with the captured values
  addStudent(firstName, lastName, email, enrollmentDate);
});

function addStudent(firstName, lastName, email, enrollmentDate) {
  fetch("http://localhost:3000/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email: email,
      enrollment_date: enrollmentDate,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(() => {
      alert("Student added successfully");
      getAllStudents(); // Refresh the student list
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}

document
  .getElementById("updateEmailForm")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission

    const studentId = document.getElementById("updateStudentId").value;
    const newEmail = document.getElementById("updateEmail").value;

    updateStudentEmail(studentId, newEmail);
  });

function updateStudentEmail(studentId, newEmail) {
  fetch(`http://localhost:3000/students/${studentId}/email`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: newEmail }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(() => {
      alert("Student email updated successfully");
      // Optionally, refresh the student list or clear the form fields
      document.getElementById("updateEmailForm").reset();
      // If you have a function to refresh the student list, call it here to show the updated info
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}
function deleteStudent() {
  const studentId = document.getElementById("deleteStudentId").value;
  fetch(`http://localhost:3000/students/${studentId}`, {
    method: "DELETE",
  }).then(() => {
    alert("Student deleted successfully");
    getAllStudents();
  });
}

// Initial fetch of all students
window.onload = function () {
  getAllStudents();
};
