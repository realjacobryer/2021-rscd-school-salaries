document.addEventListener("DOMContentLoaded", function (e) {
	//NodeList
	const item_rows = document.querySelectorAll(".calculator .row:not(.total)");

	item_rows.forEach(function (row) {
		const qty_field = row.querySelector("input");
		qty_field.addEventListener("change", item_input_listener)
		qty_field.addEventListener("keyup", item_input_listener)
	});
});

function item_input_listener(e) {
	const this_input = e.target;
	const row = this_input.closest(".row");
	const qty = this_input.value;

	const schools = row.querySelectorAll(".franklin, .wilson, .barton");
	schools.forEach(function (school) {
		let point = school.dataset.point;

		point = parseFloat(point);

		const total = point / qty;

		school.querySelector("span").innerHTML = whole_number(total);
	});

	const salaries = row.querySelectorAll(".salary");
	salaries.forEach(function (salary) {
		let cost = salary.dataset.cost;

		cost = parseFloat(cost);

		const total = cost * qty;

		salary.querySelector("span").innerHTML = round_number(total);
	});

	row.classList.add("active");
	calculate_totals();
}

function calculate_totals() {
	const item_rows = document.querySelectorAll(".calculator .row:not(.total)");

	let salary = 0;

	item_rows.forEach(function (row) {
		let qty = row.querySelector("[name='qty']").value;

		if (qty == "") {
			return false;
		}

		qty = parseFloat(qty);

		const salaries = row.querySelectorAll(".salary");
		salaries.forEach(function (salary) {
			const cost = parseFloat(salary.dataset.cost);
			const total = qty * cost;

			if (salary.classList.contains("salary")) {
				salary = salary + total;
			}
		});
	});
	const total_row = document.querySelector(".row.total");
	total_row.classList.add("active");
	total_row.querySelector(".salary span").innerHTML = round_number(salary);
}

function round_number(num) {
	num = num * 100;
	num = Math.round(num);
	num = num / 100;
	num = num.toFixed(2);
	return num;
}

function whole_number(num) {
	num = num * 100;
	num = Math.floor(num);
	num = num / 100;
	num = num.toFixed(0);
	return num;
}