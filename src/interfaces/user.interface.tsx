export interface UserProps {
    name?:string;
	email?:string;
	password?:string;
	cpf?:string;
	isAdmin?:boolean;
	phone?:string;
	current_plan?:string;
}

export interface UserCardProps {
	name:string;
	cpf:string;
	isAdmin:boolean | undefined;
	working_out:boolean | undefined;
}