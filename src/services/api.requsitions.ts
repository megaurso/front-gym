import Toast from "@/components/toast";
import api from "./api";
import { UserProps } from "@/interfaces/user.interface";
import { PlansEditProps, PlansProps } from "@/interfaces/plans.interface";

export const getAllUser = async (token: string, page: number) => {
  try {
    const response = await api.get(`/api/users?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUser = async (token: string, id: string) => {
  try {
    const response = await api.get(`/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const editUser = async (
  token: string,
  idUser: string,
  updatedFields: Partial<UserProps>
) => {
  try {
    const response = await api.patch(`/api/users/${idUser}`, updatedFields, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    Toast({
      message: "Email ou cpf ja existe!",
      isSucess: false,
    });
    return null;
  }
};

export const deleteUser = async (token: string, idUser: string) => {
  try {
    await api.delete(`/api/users/${idUser}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Toast({ message: "Sua conta foi excluida!", isSucess: true });
  } catch (error) {
    return error;
  }
};

export const createPlans = async (token: string, plans: PlansProps) => {
  try {
    const response = await api.post("/api/plans", plans, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Toast({ message: "Seu plano foi criado com sucesso", isSucess: true });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const editPlans = async (
  token: string,
  idPlan: string,
  plans: PlansEditProps
) => {
  try {
    const response = await api.patch(`/api/plans/${idPlan}`, plans, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Toast({
      message: "Plano editado com sucesso!",
      isSucess: false,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getPlans = async (token: string) => {
  try {
    const response = await api.get("/api/plans", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getOnePlan = async (token: string, idPlan: string) => {
  try {
    const response = await api.get(`/api/plans/${idPlan}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deletePlan = async (token: string, idPlan: string) => {
  try {
    await api.delete(`api/plans/${idPlan}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Toast({ message: "Plano foi excluido!", isSucess: true });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const startingTraining = async (token: string, userId: string) => {
  try {
    const response = await api.post("/api/working-out", { user_id: userId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Toast({ message: "Usuário começou a treinar", isSucess: true });
    return response.data;
  } catch (error) {
    Toast({message:"Usuário não tem plano para iniciar o treino.", isSucess: false});
    console.log(error);
  }
};

export const stopTraining = async (token: string, userId: string) => {
  try {
    await api.delete(`/api/working-out/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      
    });
    Toast({ message: "Usuário parou de treinar", isSucess: true });
  } catch (error) {
    console.log(error);
  }
};
