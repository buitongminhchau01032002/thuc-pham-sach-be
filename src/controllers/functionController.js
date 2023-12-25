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
                            id: 'add',
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
                    id: 'product-type',
                    name: 'Quản lý loại sản phẩm',
                    subFunctions: [
                        {
                            id: 'view',
                            name: 'Xem',
                        },
                        {
                            id: 'add',
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
                            id: 'add',
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
                            id: 'add',
                            name: 'Tạo',
                        },
                        {
                            id: 'delete',
                            name: 'Xoá',
                        },
                    ],
                },
                {
                    id: 'customer',
                    name: 'Quản lý khách hàng',
                    subFunctions: [
                        {
                            id: 'view',
                            name: 'Xem',
                        },
                        {
                            id: 'add',
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
                    id: 'statistic',
                    name: 'Thống kê',
                    subFunctions: [
                        {
                            id: 'product',
                            name: 'Sản phẩm',
                        },
                        {
                            id: 'profit',
                            name: 'Doanh số',
                        },
                    ],
                },
                {
                    id: 'account',
                    name: 'Quản lý tài khoản',
                    subFunctions: [
                        {
                            id: 'view',
                            name: 'Xem',
                        },
                        {
                            id: 'add',
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
                    id: 'role',
                    name: 'Quản lý chức vụ',
                    subFunctions: [
                        {
                            id: 'view',
                            name: 'Xem',
                        },
                        {
                            id: 'add',
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
