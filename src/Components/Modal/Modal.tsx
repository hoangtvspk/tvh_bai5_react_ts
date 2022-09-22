import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Modal.css";

interface ModalProps {
  icon: IconProp;
  title: string;
  body: string;
  action: string;

  onAccept: () => void;
  onCancel: () => void;
  isShow: boolean;
}

const Modal = ({
  icon,
  title,
  body,
  action,
  onAccept,
  onCancel,

  isShow,
}: ModalProps) => {
  return (
    <>
      {isShow && (
        <div className="modal-wrapper">
          <div className="modal">
            <FontAwesomeIcon
              className="modal-close"
              icon={faClose}
              onClick={onCancel}
            />
            <div className="modal-content">
              <div className="modal-icon">
                <div className="modal-circle">
                  <FontAwesomeIcon className="modal-inside" icon={icon} />
                </div>
              </div>

              <p className="modal-title">{title}</p>
              <p className="modal-body">{body}</p>
              <div className="button-layout">
                <button className="btn-cancel" onClick={onCancel}>
                  <p>Close</p>
                </button>
                <button className="btn-accept" onClick={onAccept}>
                  <p>{action}</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
