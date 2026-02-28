import react, { useState } from 'react';
import Blog from './component/Blog';
import ConfirmationModal from '../common/ConfirmationModal';
import { useToast } from '../common/ToastContext';

export function BlogPage() {
    const [showConfirm, setShowConfirm] = useState(false);
    const toast = useToast();

    const handleDelete = () => {
        // placeholder for delete logic
        setShowConfirm(false);
        toast.addToast('Bài viết đã được xóa', 'success');
    };

    return (
        <>
            <Blog />
            {/* example action */}
            <div className="p-4">
                <button
                    onClick={() => setShowConfirm(true)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >Xóa bài viết (demo)</button>
            </div>

            <ConfirmationModal
                open={showConfirm}
                title="Xác nhận xóa"
                message="Bạn có chắc muốn xóa bài viết này?"
                onConfirm={handleDelete}
                onCancel={() => setShowConfirm(false)}
                confirmText="Xóa"
                cancelText="Hủy"
            />
        </>
    )
};