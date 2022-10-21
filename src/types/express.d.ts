declare namespace Express {
  export interface User {
    cpf: string;
    email: string;
    password: string;
    name: string;
    phone: string | null;
    type: "STUDENT" | "NURSE" | "FAMILY";
    student: {
      userCpf: string;
      isPermitted: boolean;
    } | null;
    nurse: {
      userCpf: string;
      isPermitted: boolean;
      isAdmin: boolean;
    } | null;
    family: {
      userCpf: string;
    } | null;
  }
}
