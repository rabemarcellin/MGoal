import axiosInstance from ".";

export const createTodoService = async (goalId, context) => {
    try {
        const { data } = await axiosInstance.post('/do/create', {
            type: 'todo',
            context: context,
            goal: goalId
        })
        return data
    } catch(err) {
        return false
    }
}