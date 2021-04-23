import { Request, Response } from "express";
import { SettingsService } from '../services/SettingsService';

class SettingsController {
    async create(request: Request, response: Response): Promise<Response> {
        const { chat, username } = request.body;
        const settingsServices = new SettingsService();
        try {
            const settings = await
                settingsServices.create({ chat, username });
            return response.json(settings);
        }
        catch (err) {
            return response.status(400).json({
                message: err.message,
            });
        }
    }

    async findByUserName(request: Request, response: Response) {
        const { username } = request.params;
        const settingsServices = new SettingsService();
        const settings = await settingsServices.findByUserName(username);
        return response.json(settings);
    }

    async update(request: Request, response: Response) {
        const { username } = request.params;
        const { chat } = request.body;

        const settingsServices = new SettingsService();
        const settings = await settingsServices.update(username, chat);
        return response.json(settings);
    }
}

export { SettingsController }