import { Testimonial } from '../models';

export interface ITestimonialRepository {
  getTestimonials(): Promise<Testimonial[]>;
  saveTestimonial(testimonial: Testimonial): Promise<void>;
}
