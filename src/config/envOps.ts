import dotenv from "dotenv";

dotenv.config( );

export const envs = {
    api_port: process.env.PORT || 4041,
}
