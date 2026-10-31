let employees = [
  {
    employeeCode: "EMP-001",
    fullName: "Ngô Thanh Tùng",
    department: "Phòng Kỹ Thuật",
    age: 28,
    experienceYears: 5,
  },
  {
    employeeCode: "EMP-002",
    fullName: "Hồ Thị Thu",
    department: "Phòng Nhân Sự",
    age: 35,
    experienceYears: 10,
  },
  {
    employeeCode: "EMP-003",
    fullName: "Mai Quốc Việt",
    department: "Phòng Kỹ Thuật",
    age: 24,
    experienceYears: 1,
  },
];

function main() {
  let run = true;
  do {
    displayMenu();
    let rawChoice = prompt("Vui lòng nhập lựa chọn của bạn (0 - 5):");
    if (rawChoice === null) {
      console.log("Lỗi: Bạn chưa nhập lựa chọn!");
      continue;
    }
    let choiceStr = rawChoice.trim();
    if (choiceStr === "" || isNaN(choiceStr)) {
      console.log("Lỗi: Lựa chọn không hợp lệ, vui lòng nhập số từ 0 đến 5!");
      continue;
    }
    let choice = Number(choiceStr);

    switch (choice) {
      case 1:
        handleDisplayEmployees();
        break;
      case 2:
        handleAddEmployee();
        break;
      case 3:
        handleUpdateEmployee();
        break;
      case 4:
        handleDeleteEmployee();
        break;
      case 5:
        handleSearchEmployee();
        break;
      case 0:
        console.log("Cảm ơn bạn đã sử dụng chương trình, hẹn gặp lại!");
        run = false;
        break;
      default:
        console.log("Lỗi: Vui lòng chọn trong khoảng từ 0 đến 5!");
        break;
    }
  } while (run);
}

function displayMenu() {
  let menu =
    "==================================================\n" +
    "HỆ THỐNG QUẢN LÝ NHÂN VIÊN CÔNG TY SKYTECH\n" +
    "==================================================\n" +
    "1. Hiển thị danh sách nhân viên\n" +
    "2. Thêm nhân viên mới\n" +
    "3. Cập nhật thông tin nhân viên\n" +
    "4. Xóa nhân viên\n" +
    "5. Tìm kiếm nhân viên theo phòng ban\n" +
    "0. Thoát chương trình\n" +
    "==================================================";
  console.log(menu);
}

function normalizeText(rawText) {
  let trimmed = rawText.trim().replace(/\s+/g, " ");
  if (trimmed === "") {
    return "";
  }
  let words = trimmed.toLowerCase().split(" ");
  let result = [];
  for (let i = 0; i < words.length; i++) {
    result.push(words[i].charAt(0).toUpperCase() + words[i].slice(1));
  }
  return result.join(" ");
}

function validateEmployeeCode(code) {
  if (code === "") {
    return "Lỗi: Chưa nhập mã nhân viên";
  }
  if (code.length < 6) {
    return "Lỗi: Độ dài nhỏ hơn 6 ký tự";
  }
  if (!code.startsWith("EMP-")) {
    return "Lỗi: Sai tiền tố 'EMP-'";
  }
  if (code.includes(" ")) {
    return "Lỗi: Chứa khoảng trắng";
  }
  if (findEmployeeIndex(code) !== -1) {
    return "Lỗi: Mã nhân viên đã tồn tại";
  }
  return "";
}

function findEmployeeIndex(code) {
  for (let i = 0; i < employees.length; i++) {
    if (employees[i].employeeCode === code) {
      return i;
    }
  }
  return -1;
}

function inputIntegerInRange(message, min, max) {
  while (true) {
    let input = prompt(message);
    if (input === null) {
      return null;
    }
    input = input.trim();
    if (input === "") {
      console.log("Lỗi: Chưa nhập, vui lòng nhập lại");
      continue;
    }
    let number = Number(input);
    if (isNaN(number) || !Number.isInteger(number)) {
      console.log("Lỗi: Không phải số nguyên, vui lòng nhập lại");
      continue;
    }
    if (number < min || number > max) {
      console.log(`Lỗi: Ngoài phạm vi ${min} - ${max}, vui lòng nhập lại`);
      continue;
    }
    return number;
  }
}

function displayEmployees(list) {
  if (list.length === 0) {
    console.log("Danh sách nhân viên trống");
    return;
  }
  for (let i = 0; i < list.length; i++) {
    let emp = list[i];
    console.log(
      `${i + 1}. ${emp.employeeCode} - ${emp.fullName} - ${emp.department}`,
    );
    console.log(
      `   Tuổi: ${emp.age} | Số năm kinh nghiệm: ${emp.experienceYears}`,
    );
  }
  console.log(`Tổng số nhân viên: ${list.length}`);
}

function handleDisplayEmployees() {
  console.log("=== DANH SÁCH NHÂN VIÊN ===");
  displayEmployees(employees);
}

function handleAddEmployee() {
  let rawCode = prompt("Nhập mã nhân viên:");
  if (rawCode === null) {
    console.log("Hủy thao tác thêm");
    return;
  }
  let code = rawCode.trim().toUpperCase();
  let errorMsg = validateEmployeeCode(code);
  if (errorMsg !== "") {
    console.log(errorMsg);
    return;
  }

  let fullName = "";
  while (true) {
    let rawName = prompt("Nhập họ và tên nhân viên:");
    if (rawName === null) {
      console.log("Hủy thao tác thêm");
      return;
    }
    fullName = normalizeText(rawName);
    if (fullName === "") {
      console.log("Lỗi: Họ tên không được để trống");
    } else {
      break;
    }
  }

  let department = "";
  while (true) {
    let rawDepartment = prompt("Nhập phòng ban:");
    if (rawDepartment === null) {
      console.log("Hủy thao tác thêm");
      return;
    }
    department = normalizeText(rawDepartment);
    if (department === "") {
      console.log("Lỗi: Phòng ban không được để trống");
    } else {
      break;
    }
  }

  let age = inputIntegerInRange("Nhập tuổi (18 - 60):", 18, 60);
  if (age === null) {
    console.log("Hủy thao tác thêm");
    return;
  }

  let experienceYears = inputIntegerInRange(
    "Nhập số năm kinh nghiệm (0 - 40):",
    0,
    40,
  );
  if (experienceYears === null) {
    console.log("Hủy thao tác thêm");
    return;
  }

  let newEmployee = {
    employeeCode: code,
    fullName: fullName,
    department: department,
    age: age,
    experienceYears: experienceYears,
  };
  employees.push(newEmployee);

  console.log("Thêm nhân viên thành công:");
  console.log(
    `${newEmployee.employeeCode} - ${newEmployee.fullName} - ${newEmployee.department}`,
  );
  console.log(
    `   Tuổi: ${newEmployee.age} | Số năm kinh nghiệm: ${newEmployee.experienceYears}`,
  );
}

function handleUpdateEmployee() {
  console.log("Chức năng cập nhật thông tin nhân viên chưa được hỗ trợ.");
}

function handleDeleteEmployee() {
  let rawCode = prompt("Nhập mã nhân viên cần xóa:");
  if (rawCode === null) {
    console.log(`Đã hủy thao tác xóa, còn ${employees.length} nhân viên`);
    return;
  }
  let code = rawCode.trim().toUpperCase();
  let index = findEmployeeIndex(code);
  if (index === -1) {
    console.log(`Không tìm thấy nhân viên có mã ${code}`);
    return;
  }

  let confirmInput = prompt("Bạn có chắc chắn muốn xóa? (Y/N):");
  if (confirmInput !== null && confirmInput.trim().toLowerCase() === "y") {
    employees.splice(index, 1);
    console.log(`Xóa thành công, còn ${employees.length} nhân viên`);
  } else {
    console.log(`Đã hủy thao tác xóa, còn ${employees.length} nhân viên`);
  }
}

function handleSearchEmployee() {
  let rawKeyword = prompt("Nhập từ khóa phòng ban cần tìm:");
  if (rawKeyword === null || rawKeyword.trim() === "") {
    console.log("Chưa nhập từ khóa tìm kiếm");
    return;
  }
  let keyword = rawKeyword.trim().toLowerCase();

  let results = [];
  for (let i = 0; i < employees.length; i++) {
    if (employees[i].department.toLowerCase().includes(keyword)) {
      results.push(employees[i]);
    }
  }

  if (results.length === 0) {
    console.log("Không tìm thấy nhân viên phù hợp");
    return;
  }
  displayEmployees(results);
}

main();
