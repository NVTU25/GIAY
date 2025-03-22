import { Button, Form, Input, message } from "antd"
import { ICategoryFrom } from "../interface/category"
import axios from "axios"
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


function AddCategory () {
    const nav = useNavigate();
    const addCategory = async (category:ICategoryFrom) => {
        await axios.post(` http://localhost:3000/categorys`, category);
    }
    const { mutate } = useMutation({
        mutationKey: ["addCategory"],
        mutationFn: addCategory,
        onSuccess: () => {
            message.success("Thêm mới thành công");
            nav('/dashboard/listCategory');
        },
        onError: () => {
            message.error("Lỗi !");
        }
    })
    function onFinish (values:any) {
        mutate(values);
    }
    return (
        <div className="w-[97%] mx-auto mt-[0px] ">
            <h1 className="font-[Merriweather] font-semibold text-[30px] mb-[20px]">Add Category</h1>
            <Form onFinish={onFinish} className="pt-[20px]">
                <Form.Item className="flex flex-col" label="Tên danh mục" name="nameCategory" rules={[ {required: true} ]}>
                    <Input className="h-[40px]"/>
                </Form.Item>
                <Form.Item label="Ảnh danh mục" name="imageCategory" rules={[ {required: true} ]}>
                    <Input className="h-[40px]"/>
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Thêm mới
                </Button>
            </Form>
        </div>
    )
}
export default AddCategory