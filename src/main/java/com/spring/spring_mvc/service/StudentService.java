package com.spring.spring_mvc.service;

import java.util.List;

import com.spring.spring_mvc.dto.StudentDto;

/**
 * StudentService
 * Service interface defining business operations for managing student records.
 * 
 * @author Felisa Bascug
 */
public interface StudentService {

    StudentDto createStudent(StudentDto studentDto);
    StudentDto getStudentById(Long id);
    List<StudentDto> getAllStudents();
    StudentDto updateStudent(Long id, StudentDto studentDto);
    StudentDto patchStudent(Long id, StudentDto studentDto);
    void deleteStudentById(Long id);

}
