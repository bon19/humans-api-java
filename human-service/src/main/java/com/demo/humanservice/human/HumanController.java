package com.demo.humanservice.human;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1")
public class HumanController {

    private final HumanService humanService;

    @Autowired
    public HumanController(HumanService humanService) {
        this.humanService = humanService;
    }


    @GetMapping(path = "/humans")
    public List<Human> getHumans() {
        return humanService.getHumans();
    }

    @GetMapping(path = "/human/{id}")
    public Human getHumanById(@PathVariable("id") Long id) {
        return humanService.getHumanById(id);
    }

    @PostMapping(path = "/human")
    public void addNewHuman(@RequestBody Human human) {
        humanService.addNewHuman(human);
    }

    @DeleteMapping(path = "/human/{id}")
    public void deleteHuman(@PathVariable("id") Long id) {
        humanService.deleteHuman(id);
    }

    @PutMapping(path = "/human/{id}")
    public void updateHuman(
            @PathVariable("id") Long id,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName) {
        humanService.updateHuman(id, firstName, lastName);
    }
}
