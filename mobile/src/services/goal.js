import axiosInstance from ".";
import * as FileSystem from 'expo-file-system';
import { API_URL } from "../env";


export const getGoalsService = async () => {
    try {
        const serverResponse = await axiosInstance.get('/goal')
        return serverResponse.data
    } catch(err) {
        console.error(err)
    }
}

export const createGoalService = async (data) => {
    try {
        const serverResponse = await axiosInstance.post('/goal/create', data)
        if(serverResponse.status === 201) {
            return serverResponse.data
        }
    } catch(err) {
        console.error(err)
    }
}

export const updateGoalCoverService = async (goalId, urisArray) => {
    try {
        let imagesUrl = []

        for(let uri of urisArray) {
            const { body } = await FileSystem.uploadAsync(`${API_URL}/goal/cover/upload`, uri, {
                httpMethod: 'POST',
                uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                fieldName: 'image',
            });
            imagesUrl.push(body)
        }

        console.log('images url', imagesUrl)
        
        const { data } = await axiosInstance.post(`/goal/update/${goalId}/add-covers`, { coverUrl: imagesUrl })
        return data

    } catch(err) {
        console.error(err)
    }
}
export const deleteGoalService = async (id) => {
    try {
        const {status } = await axiosInstance.delete(`/goal/delete/${id}`)
        return status
    } catch(err) {
        console.error(err)
    }
}