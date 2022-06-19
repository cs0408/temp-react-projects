import React from 'react';
import { Modal as PolarisModal } from '@shopify/polaris';

export const ModalSection = ({ children }) => {
    return <PolarisModal.Section>
        {children}
    </PolarisModal.Section>
}

const Modal = ({ active, loading, handleChange, details, children }) => {
    const { title, primaryAction, secondaryActions } = details

    return (
        <PolarisModal
            // activator={activator}
            open={active}
            onClose={handleChange}
            loading={loading}
            title={title && title}
            primaryAction={primaryAction && primaryAction}
            secondaryActions={secondaryActions && secondaryActions}
            // large={true}
            limitHeight={true}
        >
            <div className='modal-body'>
                {children}
            </div>
        </PolarisModal>
    )
}

export default Modal