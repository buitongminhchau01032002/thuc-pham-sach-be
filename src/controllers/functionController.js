// [GET] api/function
const read = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            functions: [
                {
                    id: 'product',
                    name: 'Quản lý sản phẩm',
                    subFunctions: [
                        {
                            id: 'view',
                            name: 'Xem',
                        },
                        {
                            id: 'create',
                            name: 'Thêm',
                        },
                        {
                            id: 'delete',
                            name: 'Xoá',
                        },
                        {
                            id: 'update',
                            name: 'Sửa',
                        },
                    ],
                },
                {
                    id: 'order',
                    name: 'Quản lý hoá đơn',
                    subFunctions: [
                        {
                            id: 'view',
                            name: 'Xem',
                        },
                        {
                            id: 'create',
                            name: 'Tạo',
                        },
                        {
                            id: 'delete',
                            name: 'Xoá',
                        },
                        {
                            id: 'update',
                            name: 'Sửa',
                        },
                    ],
                },
                {
                    id: 'import',
                    name: 'Quản lý phiếu nhập',
                    subFunctions: [
                        {
                            id: 'view',
                            name: 'Xem',
                        },
                        {
                            id: 'create',
                            name: 'Tạo',
                        },
                        {
                            id: 'delete',
                            name: 'Xoá',
                        },
                        {
                            id: 'update',
                            name: 'Sửa',
                        },
                    ],
                },
            ],
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

module.exports = { read };
