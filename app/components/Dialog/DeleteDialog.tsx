import Dialog from "./Dialog";
import { Event } from "@/lib/types";

interface DeleteDialogProps {
    deleteDialogOpen: boolean;
    handleDeleteCancel: () => void;
    handleDeleteConfirm: () => void;
    eventToDelete: Event | null;
    deleting: boolean;
}

export default function DeleteDialog({
    deleteDialogOpen,
    handleDeleteCancel,
    handleDeleteConfirm,
    eventToDelete,
    deleting,
}: DeleteDialogProps) {
    return (
        <Dialog
            isOpen={deleteDialogOpen}
            onClose={handleDeleteCancel}
            title="Delete Event"
            size="sm"
        >
            <div className="space-y-4">
                <p className="text-gray-600">
                    Are you sure you want to delete &quot;{eventToDelete?.name}&quot;? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={handleDeleteCancel}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
                        disabled={deleting}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDeleteConfirm}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={deleting}
                    >
                        {deleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </Dialog>
    );
}