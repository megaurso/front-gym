export interface PlansProps {
    name:string;
	price: number;
	validity: "Mensal" | "Trimestral" | "Semestral" | "Anual";
}

export interface PlansEditProps {
    name?:string;
	price?: number;
	validity?: string;
}