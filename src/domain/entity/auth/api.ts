import { LoginDTO } from "@domain/entity/auth/dto/login-dto";
import { IUser } from "@domain/entity/user/index";
import { apiRootRequest } from "@domain/utils/request";

export class AuthApi {
  public static async login(fields: LoginDTO): Promise<IUser> {
    const formData = new FormData();

    for (const fieldsKey in fields) {
      formData.set(fieldsKey, fields[fieldsKey as keyof LoginDTO]);
    }

    const response = await apiRootRequest.post<IUser>("/v2/login", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    return response.data;
  }
}
