package com;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/employee")
public class BirthdayController {

	private static List<Employee> employees = new ArrayList<Employee>();

	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody String savePics(
			@RequestParam("file") MultipartFile file,
			@RequestParam("name") String name, @RequestParam("dob") String dob) {
		Employee emp = new Employee();
		if (!file.isEmpty()) {
			try {
				emp.setPhoto(file.getBytes());
				emp.setName(name);
				emp.setDob(dob);
				employees.add(emp);

			} catch (Exception e) {
			}
		}
		return "SUCCESS";
	}

	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody List<Employee> getAllEmployees() {
		return employees;
	}

	public static List<Employee> getEmployees() {
		return employees;
	}

	public static void setEmployees(List<Employee> employees) {
		BirthdayController.employees = employees;
	}

}
