import {inject, reactive, ref} from "vue";
import {defineStore} from "pinia";
import {Student} from "@/types/Student";

export const useStudentStore = defineStore('student', () => {
    const axios = inject('axios');
    const sizeNumber: number = ref(10);
    const student: Student = reactive<Student>({});
    const studentList: Array<Student> = reactive<Student[]>([]);

    async function getStudents(page: number): void {
        try {
            await axios.get('/student' + '?page=' + page + '&size=' + sizeNumber.value).then(response => {
                response.data.forEach(student => {
                    let cardUuid;
                    if (student["studentIdCard"] != null) {
                        cardUuid = student.studentIdCard.uuid;
                    } else {
                        cardUuid = null;
                    }
                    studentList.push(new Student(student.uuid, student.name, student.email, student.dob, cardUuid));
                });
            });
        } catch (error) {
            return error;
        }
    }

    async function getStudentIdCard(studentIdCard: string): Promise {
        try {
            await axios.get('/api/studentCard/' + studentIdCard).then(response => {
                student.uuid = response.data.student.uuid;
                student.name = response.data.student.name;
                student.email = response.data.student.email;
                student.dob = response.data.student.dob;
            });
            return Promise.resolve(200);
        } catch (e) {
            return Promise.reject("error");
        }
    }

    return {studentList, getStudents, getStudentIdCard};
});