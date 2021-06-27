package com.demo.humanservice.human;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class HumanService {

    private final HumanRepository humanRepository;

    @Autowired
    public HumanService(HumanRepository humanRepository) {
        this.humanRepository = humanRepository;
    }

    public List<Human> getHumans() {
        return humanRepository.findAll();
    }

    public void addNewHuman(Human human) {
        humanRepository.save(human);
    }

    public void deleteHuman(Long id) {
        boolean exists = humanRepository.existsById(id);

        if (!exists) {
            throw new IllegalStateException("record does not exist");
        }

        humanRepository.deleteById(id);
    }

    @Transactional
    public void updateHuman(Long id, String firstName, String lastName) {

        Human human = humanRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException(
                        "record does not exist"
                ));

        if (firstName != null && firstName.length() > 0 && !human.getFirst_name().equals(firstName)) {
            human.setFirst_name(firstName);
        }

        if (lastName != null && lastName.length() > 0 && !human.getLast_name().equals(lastName)) {

            human.setLast_name(lastName);
        }
    }

    public Human getHumanById(Long id) {
        Human human = humanRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException(
                        "record does not exist"
                ));

        return human;
    }
}
