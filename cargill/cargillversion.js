import React from "react";
import PropTypes from "prop-types";
import { Title } from "../../foundation/atoms";
import {
  CustomSelect,
  Modal,
  StepperForm,
  StepperFormStep
} from "../../foundation/molecules";
import GeneralTopic from "../GeneralTopicX";
import "./styles/index.css";

class ContactCustomerSupport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formOpen: false,
      selectedTopic: null
    };
  }

  handleFormClose() {
    this.setState((state) => ({
      ...state,
      formOpen: false
    }));
  }

  handleSelectChange({ value }) {
    this.setState((state) => ({
      ...state,
      formOpen: true,
      selectedTopic: value
    }));
  }

  render() {
    const { children, topics, labels, imagePath } = this.props;
    const { formOpen } = this.state;

    return (
      <div className="contact-customer-form">
        <Title classes="contact-customer-title" title={labels.title} />
        <div className="contact-customer-content">
          {imagePath && <img src={imagePath} alt="form logo" />}
          <h2>{labels.subtitle}</h2>
          <p>{labels.description}</p>
          <CustomSelect
            classes="contact-customer-topic"
            selectLabel={labels.topic}
            options={topics}
            placeholder={labels.placeholder}
            onChange={(option) => this.handleSelectChange(option)}
          />
        </div>

        <Modal open={formOpen}>
          <div className="ccs__form-wrapper">
            <StepperForm onCancel={() => this.handleFormClose()}>
              <StepperFormStep validate={() => {}}>
                <GeneralTopic />
              </StepperFormStep>{" "}
            </StepperForm>
          </div>
        </Modal>

        {children}
      </div>
    );
  }
}

ContactCustomerSupport.propTypes = {
  children: PropTypes.node,
  imagePath: PropTypes.string,
  topics: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, onChange: PropTypes.func })
  ).isRequired,
  labels: PropTypes.shape({
    topic: PropTypes.string,
    placeholder: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired
  }).isRequired
};

ContactCustomerSupport.defaultProps = {
  imagePath: null,
  children: null
};

export default ContactCustomerSupport;
