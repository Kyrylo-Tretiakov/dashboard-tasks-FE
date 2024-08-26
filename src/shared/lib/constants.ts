export enum AppRoutes {
    welcome = '/welcome',
    board = '/board',
    signIn = '/sign-in',
    signUp = '/sign-up',
    invitedBoards = '/invitedBoards',
    myBoards = '/myBoards'
}

export enum ApiRoutes {
    //User
    createUser = '/auth/create',

    //Board
    createBoard = '/board/create',
    getAllBoards = '/board/all',
    board = '/board',

    //Column
    createColumn = '/column/create',
    updateColumn = '/column/update',
    deleteColumn = '/column/delete',
    column = '/column',

    //Task

    createTask = '/task/create',
    moveTask = '/task/move',
    updateTask = '/task/update',
    getTaskById = '/task/',
    deleteTask = '/task/delete'
}

export enum HttpMethods {
    POST = 'POST',
    PATCH = 'PATCH',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export enum QueryKeys {
    Board = 'board',
    Boards = 'boards',
    User = 'user',
    Task = 'task',
    Column = 'column'
}