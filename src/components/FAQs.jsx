import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const FAQs = () => {
  const [openedItem, setOpenedItem] = useState(0);
  return (
    <section class="faq-one sec-pad sec-pad-content-margin-50">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="faq-one__content thm-gray-bg content-margin-50">
              <h3 class="faq-one__title">
                We Can Help you with all Printing Needs
              </h3>

              <p class="faq-one__text">
                We provide a complete range of printing solutions to meet your
                needs, delivering exceptional quality and customized services
                you can trust.
              </p>
              <div class="faq-one__image">
                <img src="/images/resources/faq-1-1.jpg" alt="Pic" />
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="content-margin-50 faq-one__accordion-wrap">
              <div class="block-title">
                <p class="block-title__tag-line">Mudralanka Faqs</p>
                <h2 class="block-title__title">Frequently Asked Questions</h2>
              </div>
              <div class="accrodion-grp" data-grp-name="faq-accrodion">
                {faqs.map((item, i) => (
                  <div class="accrodion active">
                    <div
                      onClick={() =>
                        setOpenedItem((prev) => (i === prev ? "" : i))
                      }
                      class="accrodion-title text-white"
                    >
                      <h4>{item.question}</h4>
                      {openedItem === i ? <FaMinus /> : <FaPlus />}
                    </div>
                    {openedItem === i && (
                      <div class="accrodion-content">
                        <div
                          class="inner"
                          dangerouslySetInnerHTML={{ __html: item.answer }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQs;

const faqs = [
  {
    question: "How much do color business card cost?",
    answer: `<p>
                Color Business Cards start at <span>$19.99</span> for{" "}
                <span>50 cards.</span>
            </p>
            <p>
                The final cost depends on which turnaround time and
                paper/finish options you've selected at checkout - you
                can get an accurate quote in seconds using our online
                cost calculator.
            </p>`,
  },
  {
    question: "How many sheets do I get in a pack of flyers?",
    answer: `<p>
                Color Business Cards start at <span>$19.99</span> for{" "}
                <span>50 cards.</span>
            </p>
            <p>
                The final cost depends on which turnaround time and
                paper/finish options you've selected at checkout - you
                can get an accurate quote in seconds using our online
                cost calculator.
            </p>`,
  },
  {
    question: "What are colors postcards made of?",
    answer: `<p>
                Color Business Cards start at <span>$19.99</span> for{" "}
                <span>50 cards.</span>
            </p>
            <p>
                The final cost depends on which turnaround time and
                paper/finish options you've selected at checkout - you
                can get an accurate quote in seconds using our online
                cost calculator.
            </p>`,
  },
  {
    question: "Can I have rounded corners on my cards?",
    answer: `<p>
                Color Business Cards start at <span>$19.99</span> for{" "}
                <span>50 cards.</span>
            </p>
            <p>
                The final cost depends on which turnaround time and
                paper/finish options you've selected at checkout - you
                can get an accurate quote in seconds using our online
                cost calculator.
            </p>`,
  },
];
