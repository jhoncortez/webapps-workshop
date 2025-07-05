
import type { Request, Response } from 'express'; // Importing Response, Request from 'express'

interface ApiResponse {
    success: boolean;
    data?: any;
    error?: string;
}

class aiServicesController {
    private readonly baseurl: string = process.env.AISERVICESPYTHON_URL || 'http://localhost:8000';

    private generateRecommendations = async (prompt: string) : Promise<ApiResponse> => {
        // console.log(prompt)
        try {
            const response = await fetch(`${this.baseurl}/recommend`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                
                body: JSON.stringify({ prompt: prompt, top_n: 3 }),
            });
            const data = await response.json();
            console.log(data)
            if (!data && !data.recommendations) {
                return {success: false, error: 'Failed to generate recommendations'}
            }
            return {success: true, data: data.recommendations};
        } catch (error) {
            console.error('Error generating recommendations:', error);
            return {success: false, error: 'The app failed to generate recommendations'}
        }
    }

    endpointRecommendations = async ( req: Request, res: Response) : Promise<void>  =>{
        try {
            const prompt = req.body.prompt;
            const recommendations = await this.generateRecommendations(prompt);
            if (!recommendations.success) {
                res.status(500).json({ error: 'Failed to generate recommendations' });
                return;
            }
            res.status(200).json(recommendations.data);
        } catch (error) {
            console.error('Error generating recommendations:', error);
            res.status(500).json({ error: 'Failed to generate recommendations' });
        }
    }
}

export default new aiServicesController