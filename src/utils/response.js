export const successResponse = (res, data, message = 'Sucesso', code = 200) => {
    return res.status(code).json({
        code,
        ok: true,
        message,
        data,
    });
};

export const errorResponse = (res, message = 'Erro interno', code = 500, data = null) => {
    return res.status(code).json({
        code,
        ok: false,
        message,
        data,
    });
};
