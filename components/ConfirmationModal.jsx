import React from 'react';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800/75'>
      <div className='bg-blue-200 px-6 py-8 mx-1 rounded-lg'>
        <div className='bg-blue-50 backdrop-blur-sm rounded-lg p-4'>
          <p className='text-gray-700'>
            Are you sure you want to clear the canvas?
          </p>
          <div className='mt-4 flex justify-end'>
            <button
              className='px-4 py-2 mr-2 bg-blue-500 text-blue-50 rounded-lg hover:animate-pulse'
              onClick={onConfirm}
            >
              Yes
            </button>
            <button
              className='px-4 py-2 bg-blue-950 text-white rounded-lg  hover:animate-pulse'
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
